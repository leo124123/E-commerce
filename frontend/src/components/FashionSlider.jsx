import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

import 'swiper/css'
import 'swiper/css/navigation'

import styles from './FashionSlider.module.css'

import img1 from '../assets/img/imgi_34_FUTURE-9-ULTIMATE-Women\'s-Firm-Ground-Soccer-Cleats.jpg'
import img2 from '../assets/img/imgi_37_Artificial-Ground-Soccer-Cleats.jpg'
import img3 from '../assets/img/imgi_36_ULTRA-6-PRO-Men\'s-Firm-Ground-Soccer-Cleats.jpg'
import img4 from '../assets/img/imgi_35_Artificial-Ground-Soccer-Cleats.jpg'

const products = [
  {
    image: img1,
    title: 'FUTURE 9 ULTIMATE',
    subtitle: "Women's Firm Ground Soccer Cleats",
    price: '$245.00',
  },
  {
    image: img2,
    title: 'FUTURE 9 PRO',
    subtitle: 'Artificial Ground Soccer Cleats',
    price: '$220.00',
  },
  {
    image: img3,
    title: 'ULTRA 6 PRO',
    subtitle: "Men's Firm Ground Soccer Cleats",
    price: '$240.00',
  },
  {
    image: img4,
    title: 'KING ELITE',
    subtitle: 'Professional Soccer Cleats',
    price: '$260.00',
  },
  {
    image: img4,
    title: 'KING ELITE',
    subtitle: 'Professional Soccer Cleats',
    price: '$260.00',
  },
  {
    image: img4,
    title: 'KING ELITE',
    subtitle: 'Professional Soccer Cleats',
    price: '$260.00',
  },
  {
    image: img4,
    title: 'KING ELITE',
    subtitle: 'Professional Soccer Cleats',
    price: '$260.00',
  },
]

export default function FashionSlider() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <p>NEW COLLECTION</p>
        <h2>Fashion Sneakers</h2>
      </div>

      <div className={styles.container}>
        <button
          className={`${styles.navButton} ${styles.prev}`}
        >
          <ChevronLeft size={22} />
        </button>

        <Swiper
          modules={[Navigation]}
          centeredSlides={true}
          slidesPerView={2.4}
          spaceBetween={40}
          loop={true}
          speed={900}
          grabCursor={true}
          navigation={{
            prevEl: `.${styles.prev}`,
            nextEl: `.${styles.next}`,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.15,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1.8,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 2.4,
              spaceBetween: 40,
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className={styles.dotGrid}></div>

                <div className={styles.media}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.image}
                  />
                </div>

                <div className={styles.info}>
                  <span className={styles.category}>
                    NEW DROP
                  </span>

                  <h3 className={styles.title}>
                    {product.title}
                  </h3>

                  <p>{product.subtitle}</p>

                  <div className={styles.ctaRow}>
                    <span className={styles.price}>
                      {product.price}
                    </span>

                    <button className={styles.shopBtn}>
                      Shop Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`${styles.navButton} ${styles.next}`}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  )
}