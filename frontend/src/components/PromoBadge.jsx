import { X } from 'lucide-react'
import { useState } from 'react'
import './promoBadge.css'

export default function PromoBadge() {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div className="promo-badge">
      <div className="promo-badge__content">
        <span className="promo-badge__text">GET 20% OFF</span>
        <button 
          className="promo-badge__close"
          onClick={() => setIsOpen(false)}
          aria-label="Close promo"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
