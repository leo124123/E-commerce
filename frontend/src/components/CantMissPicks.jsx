import { useEffect, useRef } from 'react'
import './cantMissPicks.css'

const bgImage = new URL('../assets/img/seccion.jpg', import.meta.url).href

export default function CantMissPicks() {
  const layerRef = useRef(null)

  useEffect(() => {
    const el = layerRef.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)))
      el.style.transform = `translate3d(0, ${-20 + progress * 40}px, 0)`
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section className="cantmiss-section">
      <div className="cantmiss-bg" ref={layerRef} style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="cantmiss-overlay" />
      <div className="cantmiss-content container">
        <div className="cantmiss-panel">
          <span className="cantmiss-tag">Featured Drop</span>
          <h2>CAN'T-MISS PICKS</h2>
          <p className="cantmiss-sub">Curated premium looks and statement pieces ready for the next level. Shop what everyone is wearing now.</p>
          <div className="cantmiss-cta">
            <button className="btn btn-outline">MEN'S BEST SELLERS</button>
            <button className="btn btn-solid">WOMEN'S BEST SELLERS</button>
          </div>
        </div>
      </div>
    </section>
  )
}
