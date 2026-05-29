import { useState } from 'react'
import './register.css'

export default function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    try {

      const res = await fetch('/api/auth/register', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name,
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

        alert('Account created 🔥')

        window.location.href = '/'

      } else {
        alert(data.message)
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="register-page">

      <div className="register-container">

        <h1>Create Account</h1>

        <form
          className="register-form"
          onSubmit={handleRegister}
        >

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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
            Create Account
          </button>

        </form>

        <div className="register-footer">
          <p>
            Already have an account?
            <a href="/login"> Login</a>
          </p>
        </div>

      </div>

    </div>
  )
}