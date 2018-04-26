// @flow
import * as React from 'react'
import type { User } from '../types/user_types'

const userDefault: User = false
const UserContext = React.createContext({
  user: userDefault,
  updateUser: () => {}
})

const UserProvider = UserContext.Provider
const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }
