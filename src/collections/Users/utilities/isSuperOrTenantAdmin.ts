import type { PayloadRequest } from 'payload/dist/types'

import { isSuperAdmin } from '../../utilities/isSuperAdmin'

export const isSuperOrTenantAdmin = async (args: { req: PayloadRequest }): Promise<boolean> => {
  const {
    req: { user },
  } = args

  // always allow super admins through
  if (isSuperAdmin(user)) {
    return true
  }

  // if the user is an admin of any tenant, allow access
  if (user.tenants?.find(({ roles }) => roles?.some((role: string) => role === 'admin'))) {
    return true
  }

  return false
}
