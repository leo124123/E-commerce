import Hero from '../components/hero'
import '../components/hero.css'
import './home.css'
import FashionSlider from '../components/FashionSlider'
import Profesional from '../components/Profesional'
import PumaSection from '../components/PumaSection'
import CantMissPicks from '../components/CantMissPicks'

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="featured-intro container">
        <p>
          Stage fright? Not in the Showtime Pack. With mismatched
          colorways for unmatched moments – inspired by the legendary
          2014 Tricks Pack – FUTURE, ULTRA, and KING are back on the
          biggest stage. The world is watching. Might as well put on
          a show.
        </p>
      </section>

      <FashionSlider />
      <Profesional />
      <PumaSection />
      <CantMissPicks />

    </main>
  )
}