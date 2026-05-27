import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import "../pages/products.css"

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

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
        <h2>All Sneakers</h2>
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        ) : (
          <h3>No products found</h3>
        )}
      </div>
    </section>
  )
}