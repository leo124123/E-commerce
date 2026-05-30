import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './checkout.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

function CheckoutForm({ clientSecret, amount }) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [processing, setProcessing] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    setMessage('Procesando pago...')

    const cardElement = elements.getElement(CardElement)
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name || 'Cliente Stripe',
          email: email || undefined,
        },
      },
    })

    if (result.error) {
      setMessage(result.error.message || 'Error al procesar el pago.')
      setStatus('error')
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      setMessage('¡Pago completado! Gracias por tu compra.')
      setStatus('success')
      cardElement.clear()
    } else {
      setMessage('El pago está pendiente. Por favor revisa tu tarjeta.')
      setStatus('pending')
    }

    setProcessing(false)
  }

  return (
    <div className="checkout-form-card">
      <div className="checkout-form-header">
        <p>Formulario de pago</p>
        <h2>Tarjeta de crédito</h2>
      </div>

      {status === 'success' ? (
        <div className="checkout-result success">
          <h3>Pago aprobado</h3>
          <p>{message}</p>
          <button type="button" onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
      ) : (
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>
            Nombre completo
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre en la tarjeta"
              required
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </label>

          <div className="card-element-wrapper">
            <CardElement options={{
              style: {
                base: {
                  color: '#fff',
                  fontSize: '16px',
                  iconColor: '#bbb',
                  '::placeholder': {
                    color: '#9ca3af',
                  },
                },
                invalid: {
                  color: '#f87171',
                },
              },
            }} />
          </div>

          <button className="submit-button" type="submit" disabled={!stripe || processing}>
            {processing ? 'Procesando...' : `Pagar $${amount.toFixed(2)}`}
          </button>

          {message && <p className={`checkout-message ${status}`}>{message}</p>}
        </form>
      )}
    </div>
  )
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState('')
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      try {
        const response = await fetch('/api/checkout/create-payment-intent', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || 'No se pudo iniciar el pago')
        }

        setClientSecret(data.clientSecret)
        setAmount(data.amount)
      } catch (err) {
        console.error(err)
        setError(err.message || 'Error al preparar el pago')
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentIntent()
  }, [navigate])

  if (loading) {
    return (
      <section className="checkout-loading container">
        <div className="checkout-loading-card">
          <p>Cargando pago seguro...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="checkout-error container">
        <div className="checkout-error-card">
          <h2>Error</h2>
          <p>{error}</p>
          <button type="button" onClick={() => navigate('/cart')}>Volver al carrito</button>
        </div>
      </section>
    )
  }

  return (
    <section className="checkout-page container">
      <div className="checkout-columns">
        <aside className="checkout-summary-card">
          <span>Resumen de compra</span>
          <h3>{amount > 0 ? `$${amount.toFixed(2)}` : 'Sin artículos'}</h3>
          <p>Pago seguro con Stripe. Ingresa tu tarjeta y confirma el pago.</p>
          <ul>
            <li>Tarjeta segura</li>
            <li>Confirmación instantánea</li>
            <li>Recibo por correo</li>
          </ul>
        </aside>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} amount={amount} />
        </Elements>
      </div>
    </section>
  )
}
