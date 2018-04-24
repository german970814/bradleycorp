// @flow
import * as React from 'react'
import type { User } from '../types/user_types'

type UpdateUserType = (newUser: User) => void

const userDefault: User = false
const updateUser: UpdateUserType = newUser => {}

const UserContext = React.createContext({
  user: userDefault,
  updateUser
})

const UserProvider = UserContext.Provider
const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }
export type { UpdateUserType }
