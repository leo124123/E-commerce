import '../components/product-card.css'

export default function ProductCard({
  product,
}) {
  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await fetch(
        'http://localhost:3000/api/cart/add',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            productId: product._id,
            quantity: 1,
            color: 'Black',
            size: 42,
          }),
        }
      )

      const data = await res.json()

      console.log(data)

      alert('Added To Cart 🛒')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="product-card">
      <div className="product-card__media">
        <div className="product-card__circle"></div>

        <img
          src={
            product.images?.[0] ||
            '/assets/sample-shoe.jpg'
          }
          alt={product.title}
        />

        <div className="product-card__meta">
          <span className="product-card__label">
            {product.brand}
          </span>

          <button
            className="product-card__cta"
            onClick={addToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3>{product.title}</h3>

        <p>{product.description}</p>

        <div className="product-price">
          ${product.price}
        </div>
      </div>
    </div>
  )
}
