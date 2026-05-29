import { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {

      const res = await fetch('/api/auth/login', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await res.json()

      console.log(data)

      if (data.token) {

        // save token
        localStorage.setItem(
          'token',
          data.token
        )

        // save user
        localStorage.setItem(
          'user',
          JSON.stringify(data.user)
        )

        alert('Login successful 🔥')

        window.location.href = '/'

      } else {
        alert(data.message)
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="login-page">

      <div className="login-container">

        <h1>Login</h1>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Login
          </button>

          <div className="auth-link">
            <p>
              Don't have an account?
              <Link to="/register">
                {' '}Register
              </Link>
            </p>
          </div>

        </form>

      </div>

    </div>
  )
}