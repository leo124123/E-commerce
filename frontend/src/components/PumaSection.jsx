import './pumaSection.css'

const pumaVideo = new URL(
  '../assets/Puma/PUMA.com Clothing Shoes Accessories PUMA US (1).mp4',
  import.meta.url
).href

export default function PumaSection() {
  return (
    <section className="puma-video-section">
      <div className="puma-video-layout">
        <div className="puma-video-frame">
          <video
            className="puma-video"
            src={pumaVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        <div className="puma-video-copy">
          <div className="puma-video-copy-inner">
            <span className="puma-video-label">FREE PULISIC CELEBRATION ARM SLEEVE</span>
            <h1 className="puma-video-title">WEAR THE MOMENT</h1>
            <p className="puma-video-subtitle">WITH ANY PURCHASE</p>
            <p className="puma-video-description">
              LIMIT 1 PER ORDER. PRODUCT AND SIZE SELECTION REQUIRED. AVAILABLE WHILE
              SUPPLIES LAST. EXCLUSIONS APPLY.
            </p>
            <button className="puma-video-button">SHOP NOW</button>
          </div>
        </div>
      </div>
    </section>
  )
}
