import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { resolveProductImage } from '../utils/imageResolver'
import './product-detail.css'

const FALLBACK_IMAGE = 'https://placehold.co/900x900?text=No+Image&bg=ffffff&fc=000000'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedColor, setSelectedColor] = useState('Black')
  const [selectedSize, setSelectedSize] = useState(42)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${id}`)
        const data = await res.json()
        setProduct(data)
        setSelectedImage(resolveProductImage(data?.images?.[0] || FALLBACK_IMAGE))

        const defaultColor = data?.colors?.[0]?.value || 'Black'
        const defaultSize = data?.sizes?.[0]?.type ?? data?.sizes?.[0] ?? 42
        setSelectedColor(defaultColor)
        setSelectedSize(defaultSize)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login first to add items to your cart.')
        navigate('/login')
        return
      }

      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity,
          color: selectedColor,
          size: selectedSize,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        alert(errorData.message || 'Unable to add product to cart.')
        return
      }

      await res.json()
      alert('Added to cart successfully 🛒')
    } catch (err) {
      console.error(err)
      alert('Unable to add item to cart. Please try again.')
    }
  }

  const updateQuantity = delta => {
    setQuantity(current => Math.max(1, current + delta))
  }

  if (loading) {
    return (
      <section className="product-detail container">
        <div className="detail-loading">Loading product details…</div>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="product-detail container">
        <div className="detail-not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/products')} className="detail-back">
            Back to premium collection
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="product-detail container">
      <div className="detail-grid">
        <div className="detail-gallery">
          <div className="detail-image">
            <img
              src={resolveProductImage(selectedImage || product.images?.[0]) || FALLBACK_IMAGE}
              alt={product.title}
              onError={event => {
                event.target.onerror = null
                event.target.src = FALLBACK_IMAGE
              }}
            />
          </div>

          <div className="detail-thumbs">
            {product.images?.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                className="detail-thumb"
                onClick={() => setSelectedImage(resolveProductImage(src))}
              >
                <img
                  src={resolveProductImage(src)}
                  alt={`${product.title} view ${index + 1}`}
                  onError={event => {
                    event.target.onerror = null
                    event.target.src = FALLBACK_IMAGE
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category || 'Sneakers'}</span>
          <h1>{product.title}</h1>
          <p className="detail-copy">{product.description}</p>

          <div className="detail-meta">
            <span className="detail-price">${product.price}</span>
            <span className="detail-stock">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="detail-choices">
            <div className="detail-choice-group">
              <h4>Color</h4>
              <div className="choice-list">
                {product.colors?.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    className={`choice-pill ${selectedColor === color.value ? 'active' : ''}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => {
                      setSelectedColor(color.value)
                      if (color.image) {
                        setSelectedImage(resolveProductImage(color.image))
                      }
                    }}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="detail-choice-group">
              <h4>Size</h4>
              <div className="choice-list">
                {product.sizes?.map(size => {
                  const value = size.type ?? size
                  return (
                    <button
                      key={value}
                      type="button"
                      className={`choice-pill ${selectedSize === value ? 'active' : ''}`}
                      onClick={() => setSelectedSize(value)}
                    >
                      {value}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <div className="quantity-selector">
              <button type="button" onClick={() => updateQuantity(-1)}>-</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => updateQuantity(1)}>+</button>
            </div>

            <button
              type="button"
              className="detail-add-button"
              onClick={addToCart}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>
          </div>

          <button className="detail-back" onClick={() => navigate('/products')}>
            Back to premium collection
          </button>
        </div>
      </div>
    </section>
  )
}
