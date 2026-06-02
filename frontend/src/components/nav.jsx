import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SiPuma } from "react-icons/si";
import { resolveProductImage } from '../utils/imageResolver'

import {
  ShoppingCart,
  Search,
  User,
  Heart,
  Menu,
  X
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
  const [showSearch, setShowSearch] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)

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

  const handleSearchToggle = () => {
    setShowSearch(v => !v)
    setTimeout(() => {
      if (searchInputRef.current) searchInputRef.current.focus()
    }, 50)
  }

  const handleMobileNavToggle = () => {
    setMobileNavOpen(v => !v)
  }

  const handleMobileLinkClick = () => {
    setMobileNavOpen(false)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const q = (searchQuery || '').trim()
    if (!q) return setShowSearch(false)
    setShowSearch(false)
    setSearchQuery('')
    navigate(`/products?search=${encodeURIComponent(q)}`)
  }

  const handleFavoritesClick = () => {
    const token = localStorage.getItem('token')
    if (!token || !user) {
      navigate('/login')
      return
    }
    navigate('/favorites')
  }

  const handleTrendingSearch = (term) => {
    const q = term.trim()
    if (!q) return
    setShowSearch(false)
    setSearchQuery(q)
    navigate(`/products?search=${encodeURIComponent(q)}`)
  }

  const trendingSearches = [
    'Speedcat',
    'Ballet',
    'Speedcat Ballet',
    'Chivas',
    'Pokemon',
    'BMW',
  ]

  const suggestedProducts = [
    {
      title: 'FUTURE 9 ULTIMATE',
      subtitle: "Men's Firm Ground Soccer Cleats",
      price: '$245.00',
      image: "imgi_32_FUTURE-9-ULTIMATE-Men's-Firm-Ground-Soccer-Cleats.jpg",
    },
    {
      title: 'FUTURE 9 PRO',
      subtitle: "Men's Firm/Artificial Ground Soccer Cleats",
      price: '$145.00',
      image: 'imgi_35_Artificial-Ground-Soccer-Cleats.jpg',
    },
    {
      title: 'FUTURE 9 MATCH',
      subtitle: "Men's Firm/Artificial Ground Soccer Cleats",
      price: '$95.00',
      image: 'imgi_37_Artificial-Ground-Soccer-Cleats.jpg',
    },
    {
      title: 'FUTURE 9 MATCH FUSION',
      subtitle: "Women's Firm/Artificial Ground Soccer Cleats",
      price: '$95.00',
      image: "imgi_34_FUTURE-9-ULTIMATE-Women's-Firm-Ground-Soccer-Cleats.jpg",
    },
    {
      title: 'FUTURE 9 ULTIMATE',
      subtitle: "Women's Firm Ground Soccer Cleats",
      price: '$245.00',
      image: "imgi_34_FUTURE-9-ULTIMATE-Women's-Firm-Ground-Soccer-Cleats.jpg",
    },
    {
      title: 'ULTRA 6 ULTIMATE',
      subtitle: "Men's Firm Ground Soccer Cleats",
      price: '$240.00',
      image: "imgi_33_ULTRA-6-ULTIMATE-Men's-Firm-Ground-Soccer-Cleats.jpg",
    },
  ]

  return (
    <>
      <header className="site-header">

      <div className="shipping-bar">
        <div className="shipping-bar__inner">
          <span>FREE SHIPPING ON ORDERS $60+</span>
          <Link to="./shipping">SEE DETAILS</Link>
        </div>
      </div>

      <div className="site-header__inner">

        <div className="mobile-left-actions">
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            onClick={handleMobileNavToggle}
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button
            type="button"
            className="icon-btn mobile-search-toggle"
            aria-label="search"
            onClick={handleSearchToggle}
          >
            <Search size={18} />
          </button>
        </div>

        <div className="logo">
          <Link to="/"><SiPuma />
</Link>
        </div>

        <nav
          className={`main-nav ${mobileNavOpen ? 'mobile-open' : ''}`}
          role="navigation"
          aria-label="Main menu"
        >
          <Link to="/products" onClick={handleMobileLinkClick}>WOMEN</Link>
          <Link to="/products" onClick={handleMobileLinkClick}>MEN</Link>
          <Link to="/products" onClick={handleMobileLinkClick}>KIDS</Link>
          <Link to="/products" onClick={handleMobileLinkClick}>LIFESTYLE</Link>
          <Link to="/products" onClick={handleMobileLinkClick}>SPORT</Link>
          <Link to="/products" onClick={handleMobileLinkClick}>SALE</Link>
        </nav>

        <div className="nav-actions">
          <div className="desktop-search-wrapper">
            <button
              className="search-btn"
              aria-label="search"
              onClick={handleSearchToggle}
            >
              <Search size={16} />
              <span>SEARCH</span>
            </button>
          </div>

          <button
            className="icon-btn"
            aria-label="favorites"
            onClick={handleFavoritesClick}
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

      {showSearch && (
        <div className="search-panel">
          <div className="search-panel__inner">
            <form className="search-panel-form" onSubmit={handleSearchSubmit}>
              <div className="search-panel-field">
                <input
                  ref={searchInputRef}
                  className="search-panel-input"
                  placeholder="SEARCH PUMA.COM"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-panel-submit" aria-label="submit search">
                  <Search size={20} />
                </button>
              </div>
              <button type="button" className="search-panel-close" onClick={handleSearchToggle} aria-label="close search">×</button>
            </form>

            <div className="search-panel-grid">
              <div className="search-panel-column">
                <h3>TRENDING SEARCHES</h3>
                <ul className="trending-list">
                  {trendingSearches.map((term) => (
                    <li key={term} className="trending-item">
                      <button type="button" onClick={() => handleTrendingSearch(term)}>{term}</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="search-panel-column">
                <h3>SUGGESTED PRODUCTS</h3>
                <div className="suggested-list">
                  {suggestedProducts.map((product) => (
                    <div key={product.title} className="suggested-card">
                      <div className="suggested-card__image">
                        <img
                          src={resolveProductImage(product.image)}
                          alt={product.title}
                          onError={event => {
                            event.target.onerror = null
                            event.target.src = 'https://placehold.co/120x120?text=No+Image&bg=ffffff&fc=000000'
                          }}
                        />
                      </div>
                      <div className="suggested-card__details">
                        <strong>{product.title}</strong>
                        <p>{product.subtitle}</p>
                        <span>{product.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
    </>
  )
}