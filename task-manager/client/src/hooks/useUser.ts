import { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'
import { useLocalStorage } from './useLocalStorage'
import { IUser } from './types'

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext)
  const { setItem, removeItem } = useLocalStorage()

  const addUser = (user: IUser) => {
    setUser(user)
    setItem('user', JSON.stringify(user))
  }

  const removeUser = () => {
    setUser(null)
    removeItem('user')
  }

  return { user, addUser, removeUser }
}
