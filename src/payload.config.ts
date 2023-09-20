import dotenv from 'dotenv'
import path from 'path'

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
