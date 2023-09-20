import type { CollectionConfig } from 'payload/types'

import { superAdminFieldAccess } from '../access/superAdmins'
import { adminsAndSelf } from './access/adminsAndSelf'
import { tenantAdmins } from './access/tenantAdmins'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { isSuperOrTenantAdmin } from './utilities/isSuperOrTenantAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) =>
      !(user?.roles as string[])?.some(
        individualRole =>
          individualRole === 'super-admin' ||
          (user?.tenants as any[]).some(tenant => tenant.roles.some(role => role === 'admin')),
      ),
  },
  access: {
    read: adminsAndSelf,
    create: isSuperOrTenantAdmin,
    update: adminsAndSelf,
    delete: isSuperOrTenantAdmin,
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      access: {
        create: superAdminFieldAccess,
        update: superAdminFieldAccess,
        read: superAdminFieldAccess,
      },
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
    {
      name: 'tenants',
      type: 'array',
      label: 'Tenants',
      access: {
        create: tenantAdmins,
        update: tenantAdmins,
        read: tenantAdmins,
      },
      fields: [
        {
          name: 'tenant',
          type: 'relationship',
          relationTo: 'tenants',
          required: true,
        },
        {
          name: 'roles',
          type: 'select',
          hasMany: true,
          required: true,
          options: [
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'User',
              value: 'user',
            },
          ],
        },
      ],
    },
  ],
}
