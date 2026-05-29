import { useNavigate } from 'react-router-dom'
import { resolveProductImage } from '../utils/imageResolver'
import '../components/product-card.css'

const FALLBACK_IMAGE = 'https://placehold.co/900x900?text=No+Image&bg=ffffff&fc=000000'

export default function ProductCard({ product }) {
  const navigate = useNavigate()

  const addToCart = async event => {
    event.stopPropagation()

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login first to add items to your cart.')
        navigate('/login')
        return
      }

      const color = product.colors?.[0]?.value || 'Black'
      const size = product.sizes?.[0]?.type ?? product.sizes?.[0] ?? 42

      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          color,
          size,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        alert(errorData.message || 'Unable to add product to cart.')
        return
      }

      await res.json()
      alert('Added To Cart 🛒')
    } catch (err) {
      console.log(err)
      alert('Unable to add item to cart. Please try again.')
    }
  }

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product._id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'Enter') navigate(`/products/${product._id}`)
      }}
    >
      <div className="product-card__media">
        <div className="product-card__circle"></div>

        <img
          src={resolveProductImage(product.images?.[0]) || FALLBACK_IMAGE}
          alt={product.title}
          onError={event => {
            event.target.onerror = null
            event.target.src = FALLBACK_IMAGE
          }}
        />

        <div className="product-card__meta">
          <span className="product-card__label">{product.brand}</span>

          <button className="product-card__cta" onClick={addToCart}>
            Add To Cart
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="product-price">${product.price}</div>
      </div>
    </div>
  )
}
