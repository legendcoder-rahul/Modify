import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router'; // Assuming you use react-router-dom for navigation
import '../styles/register.scss'; // Import the SCSS file
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { loading, handleRegister } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    await handleRegister({ username, password, email })

    navigate('/')

  }
  return (
    <div className="register-container">
      <form 
      onSubmit={handleSubmit}
      className="register-form">
        <h2>Register</h2>
        <div className="register-form-group">
          <label htmlFor="name">Name</label>
          <input
            value={username}
            onInput={(e)=>setUsername(e.target.value)}
            type="text"
            id="name"
            className="register-form-input"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onInput={(e)=>setEmail(e.target.value)}
            type="email"
            id="email"
            className="register-form-input"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onInput={(e)=>setPassword(e.target.value)}
            type="password"
            id="password"
            className="register-form-input"
            placeholder="Enter your password"
            required
          />
        </div>
  
        <button type="submit" className="register-form-button">Register</button>
        <div className="register-auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register