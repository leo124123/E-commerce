import React from 'react'

export default function Products() {
  const mock = [
    { id: 1, title: 'Simple Runner', price: 99, img: '/assets/sample-shoe.jpg' },
    { id: 2, title: 'Everyday Sneaker', price: 129, img: '/assets/sample-shoe.jpg' }
  ]

  return (
    <section className="products-section container">
      <h2>All Products</h2>
      <div className="product-grid">
        {mock.map(p => (
          <div key={p.id} className="product-card">
            <div className="product-image"><img src={p.img} alt={p.title} /></div>
            <div className="product-info">
              <h3>{p.title}</h3>
              <div className="product-price">${p.price}</div>
              <button className="product-btn">Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
