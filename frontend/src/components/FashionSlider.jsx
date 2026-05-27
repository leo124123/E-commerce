import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './FashionSlider.module.css'

import img1 from '../assets/img/imgi_34_FUTURE-9-ULTIMATE-Women\'s-Firm-Ground-Soccer-Cleats.jpg'
import img2 from '../assets/img/imgi_37_Artificial-Ground-Soccer-Cleats.jpg'
import img3 from '../assets/img/imgi_36_ULTRA-6-PRO-Men\'s-Firm-Ground-Soccer-Cleats.jpg'
import img4 from '../assets/img/imgi_35_Artificial-Ground-Soccer-Cleats.jpg'
import img5 from '../assets/img/imgi_32_FUTURE-9-ULTIMATE-Men\'s-Firm-Ground-Soccer-Cleats.jpg'
import img6 from '../assets/img/imgi_33_ULTRA-6-ULTIMATE-Men\'s-Firm-Ground-Soccer-Cleats.jpg'
import img7 from '../assets/img/imgi_38_Artificial-Ground-Soccer-Cleats.jpg'
import img8 from '../assets/img/imgi_48_6d20d632367eb527c58aeee491ca51da7c5370c6.jpg'

const products = [
  { id: 1, title: 'FUTURE 9 ULTIMATE', category: "Men's Firm Ground", price: '$245.00', image: img1 },
  { id: 2, title: 'ULTRA 6 ULTIMATE', category: "Men's Firm Ground", price: '$240.00', image: img2 },
  { id: 3, title: 'ULTRA 6 PRO', category: "Women's Firm Ground", price: '$245.00', image: img3 },
  { id: 4, title: 'FUTURE 9 PRO', category: "Kids' Firm/Artificial", price: '$115.00', image: img4 },
  { id: 5, title: 'FUTURE 9 MEN', category: "Men's Firm Ground", price: '$245.00', image: img5 },
  { id: 6, title: 'ULTRA 6 MEN', category: "Men's Firm Ground", price: '$240.00', image: img6 },
  { id: 7, title: 'ARTIFICIAL FG', category: "Unisex", price: '$99.00', image: img7 },
  { id: 8, title: 'LIMITED EDITION', category: "Unisex", price: '$199.00', image: img8 }
]

export default function FashionSlider() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Swiper
          modules={[Navigation]}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          spaceBetween={40}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom'
          }}
          breakpoints={{
            320: { slidesPerView: 1.05, spaceBetween: 12 },
            640: { slidesPerView: 1.4, spaceBetween: 20 },
            900: { slidesPerView: 2.4, spaceBetween: 28 },
            1200: { slidesPerView: 3.2, spaceBetween: 36 }
          }}
        >
          {products.map((p, idx) => (
            <SwiperSlide key={p.id} className={styles.slide}>
              <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
              >
                <div className={styles.media}>
                  <div className={styles.dotGrid} />
                  <img src={p.image} alt={p.title} className={styles.image} />
                </div>
                <div className={styles.info}>
                  <small className={styles.category}>{p.category}</small>
                  <h3 className={styles.title}>{p.title}</h3>
                  <div className={styles.ctaRow}>
                    <span className={styles.price}>{p.price}</span>
                    <button className={styles.shopBtn}>SHOP NOW</button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}

          <button className={`swiper-button-prev-custom ${styles.navButton}`} aria-label="Previous slide">
            <ChevronLeft size={20} />
          </button>
          <button className={`swiper-button-next-custom ${styles.navButton}`} aria-label="Next slide">
            <ChevronRight size={20} />
          </button>
        </Swiper>
      </div>
    </div>
  )
}
