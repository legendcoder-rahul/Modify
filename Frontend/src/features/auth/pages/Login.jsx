import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'; // Assuming you use react-router-dom for navigation
import '../styles/login.scss'; // Import the SCSS file
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const { loading, handleLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin({email,password})
    navigate('/')
    
  }

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        className="login-form">
        <h2>Login</h2>
        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="login-form-input"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="login-form-input"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-form-button">Login</button>
        <div className="login-auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login