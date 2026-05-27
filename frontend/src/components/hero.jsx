import { useEffect, useState, useRef } from 'react'
import './hero.css'

// Import images from src/assets so Vite can resolve them during dev/build
import portada1 from '../assets/img/imgi_100_6cada0594dfb5ed20bd9a06583caeb53d316269f-2000x1125.jpg'
import portada2 from '../assets/img/imgi_47_22d29b2d0a2943cbddd8f6de4c4335cdfa69f8c2.jpg'

const slides = [
  { id: 1, src: portada1, alt: 'Hero 1' },
  { id: 2, src: portada2, alt: 'Hero 2' }
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex(i => (i + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer.current)
  }, [])

  return (
    <section className="hero" aria-roledescription="carousel">
      <div className="hero__slides">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`hero__slide ${i === index ? 'active' : ''}`}
            aria-hidden={i !== index}
          >
            <img src={s.src} alt={s.alt} />
          </div>
        ))}
      </div>

      <div className="hero__overlay">
        <div className="hero__copy">
          <h1 className='titulo'>SHOWTIME</h1>
          <p className='parrafo'>FT. ULTRA, FUTURE & KING.</p>
          <button className="hero__cta">SHOP NOW</button>
        </div>
      </div>
    </section>
  )
}
