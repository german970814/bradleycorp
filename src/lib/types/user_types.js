type UserPermissions = {}

type User =
  | {
      id: number,
      firstName: string,
      lastName: string,
      userName: string,
      permissions: UserPermissions
    }
  | false

export type { User }
