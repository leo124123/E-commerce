// React default import removed (automatic JSX runtime)
import './product-card.css'

export default function ProductCard({ image, title, gender = 'men' }) {
  const label = gender === 'women' ? 'WOMENS' : 'MENS'
  const cta = gender === 'women' ? 'SHOP WOMEN' : 'SHOP MEN'

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={image} alt={title} />

        <div className="product-card__circle" aria-hidden="true"></div>

        <div className="product-card__meta">
          <span className="product-card__label">{label}</span>
          <button className="product-card__cta">{cta}</button>
        </div>
      </div>
    </article>
  )
}
