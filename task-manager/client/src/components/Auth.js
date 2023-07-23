import { useState } from 'react'

import { auth } from '../services/tasksApi'
import { useAuth } from '../hooks/useAuth.ts'

function Auth() {
  const { login } = useAuth()

  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const switchView = (status) => {
    setIsLogin(status)
    setError(null)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const data = {
      email: email,
      password: password,
    }

    await auth(data, endpoint).then((res) => {
      if (res.err) {
        setError(res.err)
      } else {
        setError(null)
        login({ userEmail: res.email, authToken: res.token })
        console.log({ userEmail: res.email, authToken: res.token })
      }
    })
  }

  return (
    <div className="auth">
      <div className="auth-container" style={{ width: '400px' }}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form>
          <label className="label">Email</label>
          <input required id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <label className="label">Password</label>
          <input required id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          {!isLogin && (
            <>
              <label className="label">Confirm Password</label>
              <input
                required
                id="confirm-password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}
          <button type="submit" className="submit" onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="switch" onClick={() => switchView(!isLogin)}>
          {isLogin ? "Don't have an account?" : 'Already have an account ?'}
        </p>
        <p className="error">{error}</p>
      </div>
    </div>
  )
}

export default Auth
