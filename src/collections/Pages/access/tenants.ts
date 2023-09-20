import type { Tenant } from 'payload/generated-types'
import type { Access } from 'payload/types'

import { isSuperAdmin } from '../../utilities/isSuperAdmin'

export const tenants: Access = ({ req: { user }, data }) => {
  const userHasTenantAccessToDoc = user?.tenants?.some(
    (tenant: Tenant) => tenant.id === data?.tenant?.id,
  )
  const userIsSuperAdmin = isSuperAdmin(user)

  // Any docs that have tenant ID that matches one of the user's tenants
  const tenantAccess = {
    tenant: {
      in: user.tenants?.map(userTenant => userTenant.tenant.id).join(','),
    },
  }

  return userHasTenantAccessToDoc || userIsSuperAdmin || tenantAccess
}
