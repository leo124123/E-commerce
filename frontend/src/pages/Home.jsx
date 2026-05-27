// React default import removed (automatic JSX runtime)
import Hero from '../components/hero'
import '../components/hero.css'
import './home.css'
import ProductCard from '../components/ProductCard'
import FashionSlider from '../components/FashionSlider'
import img1 from '../assets/img/imgi_34_FUTURE-9-ULTIMATE-Women\'s-Firm-Ground-Soccer-Cleats.jpg'
import img2 from '../assets/img/imgi_37_Artificial-Ground-Soccer-Cleats.jpg'
import img3 from '../assets/img/imgi_36_ULTRA-6-PRO-Men\'s-Firm-Ground-Soccer-Cleats.jpg'
import img4 from '../assets/img/imgi_35_Artificial-Ground-Soccer-Cleats.jpg'

export default function Home() {
  const products = [
    { image: img1, title: 'FUTURE 9 ULTIMATE', subtitle: "Women's Firm Ground Soccer Cleats", price: '$245.00' },
    { image: img3, title: 'ULTRA 6 ULTIMATE', subtitle: "Men's Firm Ground Soccer Cleats", price: '$240.00' },
    { image: img4, title: 'FUTURE 9 ULTIMATE', subtitle: "Women's Firm Ground Soccer Cleats", price: '$245.00' },
    { image: img2, title: 'FUTURE 9 PRO', subtitle: "Kids' Firm/Artificial Ground Soccer Cleats", price: '$115.00' }
  ]

  return (
    <main>
      <Hero />

      <section className="featured-intro container">
        <p>
          Stage fright? Not in the Showtime Pack. With mismatched colorways for unmatched moments – inspired by the legendary 2014 Tricks Pack – FUTURE, ULTRA, and KING are back on the biggest stage. The world is watching. Might as well put on a show.
        </p>
      </section>

      <FashionSlider />

      
    </main>
  )
}
