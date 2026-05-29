import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import '../pages/products.css'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        console.log("🔥 RESPONSE API:", data)

        // ✅ FIX IMPORTANTE: asegura que siempre sea array
        const productsArray = Array.isArray(data)
          ? data
          : data.products
            ? data.products
            : []

        setProducts(productsArray)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const categories = useMemo(() => {
    const unique = new Set(products.map(item => item.category || 'Sneakers'))
    return ['All', ...Array.from(unique)]
  }, [products])

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter(product => {
      const matchesCategory =
        category === 'All' ||
        (product.category || 'Sneakers') === category
      const matchesSearch =
        query === '' ||
        `${product.title} ${product.description} ${product.brand}`
          .toLowerCase()
          .includes(query)
      return matchesCategory && matchesSearch
    })
  }, [products, search, category])

  if (loading) {
    return (
      <section className="products-section container">
        <h2>Loading...</h2>
      </section>
    )
  }

  return (
    <section className="products-section container">
      <div className="products-header">
        <p>PREMIUM COLLECTION</p>
        <h2>Elite Sports Sneakers</h2>
        <p className="products-subtext">
          Shop exclusive boots, basketball sneakers and street-ready runners designed for every game.
        </p>
      </div>

      <div className="products-toolbar">
        <input
          className="search-input"
          type="search"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Search football, basketball, running..."
        />

        <div className="category-filter">
          {categories.map(item => (
            <button
              key={item}
              type="button"
              className={`category-pill ${item === category ? 'active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="products-summary">
        <span>{filteredProducts.length} styles available</span>
        {category !== 'All' && <span>Filtered by {category}</span>}
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <h3>No products match your search.</h3>
        )}
      </div>
    </section>
  )
}