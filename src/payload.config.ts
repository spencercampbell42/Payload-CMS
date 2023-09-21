import dotenv from 'dotenv'
import path from 'path'
import payload from 'payload'

import { Icon } from './graphics/Icon'
import { Logo } from './graphics/Logo'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { buildConfig } from 'payload/config'

import { Pages } from './collections/Pages'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'

export default buildConfig({
  endpoints: [
    {
      path: '/tenant-pages/:slug',
      method: 'get',
      handler: async (req, res) => {
        const data = await payload.find({
          collection: 'pages',
          where: {
            'tenant.slug': {
              equals: req.params.slug,
            },
          },
        })
        res.status(200).send({ req: req.params, data })
      },
    },
  ],
  collections: [Users, Tenants, Pages],
  admin: {
    // Add your own logo and icon here
    components: {
      graphics: {
        Icon,
        Logo,
      },
    },
    // Add your own meta data here
    meta: {
      favicon: '/assets/favicon.ico',
      titleSuffix: '- RISE CMS',
    },
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
