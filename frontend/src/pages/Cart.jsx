import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './cart.css'

export default function Cart() {
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [recommended, setRecommended] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')

  const fetchCart = async () => {
    try {
      if (!token) {
        navigate('/login')
        return
      }

      const res = await fetch('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Unable to load cart')
      }

      const data = await res.json()
      setCart(data)
      setError('')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Unable to load cart')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await fetch('/api/products')
        if (!res.ok) return
        const data = await res.json()
        const productsArray = Array.isArray(data)
          ? data
          : data.products
          ? data.products
          : []

        const cartIds = new Set(
          cart?.items?.map((item) => item.product?._id)
        )

        const suggestions = productsArray
          .filter((product) => !cartIds.has(product._id))
          .slice(0, 3)

        setRecommended(suggestions)
      } catch (err) {
        console.error('Failed to load recommended products', err)
      }
    }

    if (!loading) {
      fetchRecommended()
    }
  }, [loading, cart])

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return
    try {
      const res = await fetch(`/api/cart/item/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Unable to update item')
      }

      const data = await res.json()
      setCart(data)
    } catch (err) {
      console.error(err)
      alert(err.message || 'Unable to update item quantity.')
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      const res = await fetch(`/api/cart/item/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Unable to remove item')
      }

      const data = await res.json()
      setCart(data)
    } catch (err) {
      console.error(err)
      alert(err.message || 'Unable to remove item from cart.')
    }
  }

  const handleAddRecommendation = async (product) => {
    try {
      if (!token) {
        navigate('/login')
        return
      }

      const color = product.colors?.[0]?.value || 'Black'
      const size = product.sizes?.[0] || 42

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
        const data = await res.json()
        throw new Error(data.message || 'Unable to add product to cart')
      }

      const data = await res.json()
      setCart(data)
      alert('Producto agregado al carrito 🛒')
    } catch (err) {
      console.error(err)
      alert(err.message || 'No se pudo agregar el producto al carrito.')
    }
  }

  const totalPrice = cart?.items?.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  )

  if (loading) {
    return (
      <section className="cart-page container">
        <div className="cart-notice">Cargando carrito...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="cart-page container">
        <div className="cart-notice cart-error">
          {error}
        </div>
      </section>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <section className="cart-page container">
        <div className="cart-header">
          <div>
            <p>Tu carrito</p>
            <h2>No tienes productos en el carrito</h2>
          </div>
        </div>

        <div className="empty-cart">
          <p>Parece que aún no has agregado nada.</p>
          <Link to="/products" className="primary-button">
            Explorar productos
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="cart-page container">
      <div className="cart-header">
        <div>
          <p>Tu carrito</p>
          <h2>Revisa tus productos</h2>
        </div>
        <div className="cart-summary-card">
          <span>Items</span>
          <strong>{cart.items.length}</strong>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map((item) => (
            <article className="cart-item" key={item._id}>
              <div className="cart-item-image">
                <img
                  src={
                    item.product?.images?.[0] ||
                    '/assets/sample-shoe.jpg'
                  }
                  alt={item.product?.title || 'Product'}
                />
              </div>

              <div className="cart-item-info">
                <h3>{item.product?.title || 'Producto'}</h3>
                <p>{item.product?.description || ''}</p>
                <div className="cart-item-meta">
                  <span>{item.product?.brand || 'Marca'}</span>
                  <span>{item.color ? `Color: ${item.color}` : ''}</span>
                  <span>{item.size ? `Talla: ${item.size}` : ''}</span>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="cart-item-price">
                <strong>${(item.product?.price || 0) * item.quantity}</strong>
                <span>
                  ${item.product?.price || 0} x {item.quantity}
                </span>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <div className="summary-card">
            <p>Subtotal</p>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <button className="checkout-btn" type="button" onClick={() => navigate('/checkout')}>
            Continuar con el pago
          </button>
          <p className="checkout-note">
            El carrito se guarda por usuario y se actualiza en tiempo real.
          </p>
        </aside>
      </div>

      {recommended.length > 0 && (
        <section className="cart-recommended">
          <div className="recommended-header">
            <div>
              <p>Recomendado para ti</p>
              <h3>Completa tu outfit con estos favoritos</h3>
            </div>
            <span className="recommended-badge">
              Basado en tu compra
            </span>
          </div>

          <div className="recommend-grid">
            {recommended.map((product) => (
              <article
                className="recommend-card"
                key={product._id}
              >
                <div className="recommend-image">
                  <img
                    src={
                      product.images?.[0] ||
                      '/assets/sample-shoe.jpg'
                    }
                    alt={product.title}
                  />
                </div>

                <div className="recommend-info">
                  <span>{product.brand || 'PUMA'}</span>
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                </div>

                <div className="recommend-footer">
                  <strong>${product.price}</strong>
                  <button
                    type="button"
                    className="recommend-button"
                    onClick={() =>
                      handleAddRecommendation(product)
                    }
                  >
                    Añadir al carrito
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  )
}
