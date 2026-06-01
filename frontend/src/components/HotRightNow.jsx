import './hotRightNow.css'
import imageLowProfile from '../assets/Product img/imgi_134_Chamarra-corta-para-mujer-FUTURE.PUMA.jpeg'
import imageFathersDay from '../assets/Product img/imgi_2_Tenis-Speedcat-Piping-para-mujer.jpeg'
import imageSummerShop from '../assets/Product img/imgi_24_Chamarra-globo-para-mujer-T7.jpeg'
import imageSummerFitness from '../assets/Product img/imgi_101_Tenis-para-mujer-H-Street-OG.jpeg'

const cards = [
  {
    title: 'LOW PROFILE',
    image: imageLowProfile,
    alt: 'Low profile Puma shoes'
  },
  {
    title: "FATHER'S DAY",
    image: imageFathersDay,
    alt: 'Father day Puma sneakers'
  },
  {
    title: 'SUMMER SHOP',
    image: imageSummerShop,
    alt: 'Summer Puma outfit'
  },
  {
    title: 'SUMMER FITNESS',
    image: imageSummerFitness,
    alt: 'Summer fitness Puma shoes'
  }
]

export default function HotRightNow() {
  return (
    <section className="hot-now-section">
      <div className="hot-now-title-wrap container">
        <h2>HOT RIGHT NOW</h2>
      </div>

      <div className="hot-now-grid container">
        {cards.map((card) => (
          <article className="hot-now-card" key={card.title}>
            <img src={card.image} alt={card.alt} />
            <div className="hot-now-card-overlay" />
            <div className="hot-now-card-copy">
              <span>{card.title}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
