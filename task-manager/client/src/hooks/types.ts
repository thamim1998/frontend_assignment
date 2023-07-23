export interface IUser {
  userEmail: string
  authToken: string
  userName: string
  userDOB: string
}

export interface IAuthContext {
  user: IUser
  setUser: (user: IUser) => void
  updateUser: (updatedUser: IUser) => void;
}
