import './profesional.css'

export default function Profesional() {
  return (
    <section className="promo-section">
      <div className="promo-grid">
        <article className="promo-card">
          <div className="promo-media">
            <img
              src="/img/imgi_48_6d20d632367eb527c58aeee491ca51da7c5370c6.jpg"
              alt="KIDSUPER x Christian Pulisic campaign"
            />
          </div>
          <div className="promo-copy">
            <h2>KIDSUPER x CHRISTIAN PULISIC</h2>
            <p>Put on Ultra. Put on a show.</p>
            <button>SHOP NOW</button>
          </div>
        </article>

        <article className="promo-card">
          <div className="promo-media">
            <img
              src="/img/imgi_146_4bb288a9984112ca630219adfd934de9565d3af0-1536x1536.jpg"
              alt="Soccer federation team kit"
            />
          </div>
          <div className="promo-copy">
            <h2>SOCCER FEDERATION TEAM KITS</h2>
            <p>Home and away.</p>
            <button>SHOP NOW</button>
          </div>
        </article>
      </div>
    </section>
  )
}