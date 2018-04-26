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

type UserContext = {
  user: User,
  updateUser: (user: User) => void
}

export type { User, UserContext }
