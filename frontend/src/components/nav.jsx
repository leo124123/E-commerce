import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SiPuma } from "react-icons/si";

import {
  ShoppingCart,
  Search,
  User,
  Heart
} from 'lucide-react'

import '../styles/nav.css'

export default function Nav() {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (error) {
      console.error('Failed to parse stored user:', error)
      return null
    }
  })
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || !user) {
      return
    }

    fetch('/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Unable to load cart')
        }
        return res.json()
      })
      .then((data) => {
        const count = Array.isArray(data.items)
          ? data.items.reduce(
              (sum, item) => sum + (item.quantity || 0),
              0
            )
          : 0
        setCartCount(count)
      })
      .catch(() => {
        setCartCount(0)
      })
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setCartCount(0)
    navigate('/login')
  }

  return (
    <header className="site-header">

      <div className="shipping-bar">
        <div className="shipping-bar__inner">
          <span>FREE SHIPPING ON ORDERS $60+</span>
          <Link to="/">SEE DETAILS</Link>
        </div>
      </div>

      <div className="site-header__inner">

        <div className="logo">
          <Link to="/"><SiPuma />
</Link>
        </div>

        <nav
          className="main-nav"
          role="navigation"
          aria-label="Main menu"
        >
          <Link to="/products">WOMEN</Link>
          <Link to="/products">MEN</Link>
          <Link to="/products">KIDS</Link>
          <Link to="/products">LIFESTYLE</Link>
          <Link to="/products">SPORT</Link>
          <Link to="/products">SALE</Link>
        </nav>

        <div className="nav-actions">

          <button
            className="search-btn"
            aria-label="search"
          >
            <Search size={16} />
            <span>SEARCH</span>
          </button>

          <button
            className="icon-btn"
            aria-label="favorites"
          >
            <Heart size={18} />
          </button>

          <Link
            to="/cart"
            className="icon-btn cart-link"
            aria-label="cart"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>

          {/* USER LOGIN */}
          {user ? (

            <div className="user-info user-dropdown-container">
              <button
                type="button"
                className="user-toggle"
              >
                <User size={18} />
                <span>{user.name}</span>
              </button>

              <div className="user-dropdown">
                <button
                  type="button"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>

          ) : (

            <Link
              to="/login"
              className="icon-btn"
            >
              <User size={18} />
            </Link>

          )}

        </div>

      </div>

    </header>
  )
}