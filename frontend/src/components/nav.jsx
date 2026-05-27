// React import removed (automatic JSX runtime)
import { Link } from 'react-router-dom'
import { ShoppingCart, Search, User, Heart } from 'lucide-react'
import '../styles/nav.css'

export default function Nav() {
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
          <Link to="/">PUMA</Link>
        </div>

        <nav className="main-nav" role="navigation" aria-label="Main menu">
          <Link to="/products">WOMEN</Link>
          <Link to="/products">MEN</Link>
          <Link to="/products">KIDS</Link>
          <Link to="/products">LIFESTYLE</Link>
          <Link to="/products">SPORT</Link>
          <Link to="/products">SALE</Link>
        </nav>

        <div className="nav-actions">
          <button className="search-btn" aria-label="search">
            <Search size={16} />
            <span>SEARCH</span>
          </button>
          <button className="icon-btn" aria-label="favorites">
            <Heart size={18} />
          </button>
          <button className="icon-btn" aria-label="cart">
            <ShoppingCart size={18} />
          </button>
          <button className="icon-btn" aria-label="account">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
