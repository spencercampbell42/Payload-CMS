import type { CollectionConfig } from 'payload/types'

import { superAdmins } from '../access/superAdmins'
import formatSlug from './hooks/formatSlug'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: superAdmins,
    read: superAdmins,
    update: superAdmins,
    delete: superAdmins,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'ID',
      type: 'text',
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
  ],
}
