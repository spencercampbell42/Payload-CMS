import type { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  // create super admin
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@ipsos.com',
      password: 'Rise2023!',
      roles: ['super-admin'],
    },
  })

  // create tenants, use `*.localhost.com` so that accidentally forgotten changes the hosts file are acceptable
  const [financeDemo, visa] = await Promise.all([
    await payload.create({
      collection: 'tenants',
      data: {
        name: 'Finance Demo',
        slug: 'finance-demo',
      },
    }),
    await payload.create({
      collection: 'tenants',
      data: {
        name: 'Visa',
        slug: 'visa',
      },
    }),
  ])

  // create tenant-scoped admins and users
  await Promise.all([
    await payload.create({
      collection: 'users',
      data: {
        email: 'visa.admin@ipsos.com',
        password: 'Rise2023!',
        roles: ['user'],
        tenants: [
          {
            tenant: visa.id,
            roles: ['admin'],
          },
        ],
      },
    }),
    await payload.create({
      collection: 'users',
      data: {
        email: 'visa.user@ipsos.com',
        password: 'Rise2023!',
        roles: ['user'],
        tenants: [
          {
            tenant: visa.id,
            roles: ['user'],
          },
        ],
      },
    }),
    await payload.create({
      collection: 'users',
      data: {
        email: 'financedemo.admin@ipsos.com',
        password: 'Rise2023!',
        roles: ['user'],
        tenants: [
          {
            tenant: financeDemo.id,
            roles: ['admin'],
          },
        ],
      },
    }),
    await payload.create({
      collection: 'users',
      data: {
        email: 'financedemo.user@ipsos.com',
        password: 'Rise2023!',
        roles: ['user'],
        tenants: [
          {
            tenant: financeDemo.id,
            roles: ['user'],
          },
        ],
      },
    }),
  ])

  // create tenant-scoped pages
  await Promise.all([
    await payload.create({
      collection: 'pages',
      data: {
        tenant: visa.id,
        title: 'Visa Page',
        richText: [
          {
            text: 'Hello, Visa!',
          },
        ],
      },
    }),
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Finance Demo Page',
        tenant: financeDemo.id,
        richText: [
          {
            text: 'Hello, Finance Demo!',
          },
        ],
      },
    }),
  ])
}
