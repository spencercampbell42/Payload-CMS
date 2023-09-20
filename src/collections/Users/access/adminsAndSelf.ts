import type { Access } from 'payload/config'
import type { User } from 'payload/generated-types'

import { isSuperAdmin } from '../../utilities/isSuperAdmin'

export const adminsAndSelf: Access<any, User> = async ({ req: { user } }) => {
  if (user) {
    const isSuper = isSuperAdmin(user)

    // allow super-admins through
    if (isSuper) {
      return true
    }

    // allow users to read themselves and any users within the tenants they are admins of
    return {
      or: [
        {
          id: {
            equals: user.id,
          },
        },
        {
          'tenants.tenant': {
            in:
              user?.tenants
                ?.map(({ tenant, roles }) =>
                  roles.includes('admin')
                    ? typeof tenant === 'string'
                      ? tenant
                      : tenant.id
                    : null,
                ) // eslint-disable-line function-paren-newline
                .filter(Boolean) || [],
          },
        },
      ],
    }
  }
}
