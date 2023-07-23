import { createContext } from 'react'
import { IAuthContext } from '../hooks/types'

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  updateUser: () => {},
})
