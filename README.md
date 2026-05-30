# E-commerce

Este proyecto es una tienda online React + Node/Express con carrito, autenticación y checkout Stripe integrado.

## Estructura del proyecto

- `frontend/` — aplicación de React con Vite.
- `backend/` — servidor Express que maneja autenticación, carrito, productos y checkout.
- `README.md` — esta guía de instalación y uso.

## Qué incluye

- Página principal con sección premium y carrito.
- Carrito persistente por usuario en MongoDB.
- Checkout con Stripe PaymentIntent.
- Rutas protegidas por JWT.
- Página de pago con formulario de tarjeta de prueba.

## Requisitos

- Node.js 18+ instalado.
- MongoDB corriendo localmente o en una URI externa.
- Cuenta de Stripe para las claves de prueba.

## Configuración del backend

1. Abre una terminal en `backend/`.
2. Instala dependencias:
   ```bash
   cd backend
   npm install
   ```
3. Crea el archivo `.env` en `backend/` con estas variables:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce
   JWT_KEY=jwtSecurityKey
   JWT_EXPIRES=7d
   PORT=3000
   STRIPE_SECRET_KEY=sk_test_...   # tu clave secreta de Stripe
   ```
4. Inicia el backend:
   ```bash
   npm run dev
   ```

## Configuración del frontend

1. Abre otra terminal en `frontend/`.
2. Instala dependencias:
   ```bash
   cd frontend
   npm install
   ```
3. Crea el archivo `.env` en `frontend/` con esta variable:
   ```env
   VITE_STRIPE_PUBLIC_KEY=pk_test_...   # tu clave pública de Stripe
   ```
4. Inicia el frontend:
   ```bash
   npm run dev
   ```

## Claves Stripe de prueba

En el dashboard de Stripe, activa `Viewing test data` y copia estas dos claves:

- `Publishable key`: `pk_test_...`
- `Secret key`: `sk_test_...`

Estas claves solo funcionan en modo test.

## Flujo de uso

1. Inicia backend y frontend.
2. Abre la app en el navegador (`http://localhost:5173`).
3. Agrega productos al carrito.
4. Ve a la página del carrito.
5. Haz clic en `Continuar con el pago`.
6. Completa el formulario con una tarjeta de prueba.

## Tarjeta de prueba Stripe

Usa estos datos completos:

```text
Tarjeta: 4242 4242 4242 4242
Vencimiento: 12/34
CVC: 123
Código postal: 12345
Nombre: Test User
Email: test@example.com
```

## Carpetas importantes

- `frontend/src/pages/Checkout.jsx` — página de pago Stripe.
- `frontend/src/pages/Cart.jsx` — vista del carrito.
- `frontend/src/App.jsx` — rutas de React.
- `backend/routes/checkout.js` — endpoint de Stripe.
- `backend/routes/cart.js` — manejo del carrito.

## Notas adicionales

- Si el backend devuelve un error JSON, revisa las variables `.env`.
- Si el frontend no encuentra el backend, confirma que `frontend/vite.config.js` tiene proxy a `http://localhost:3000`.
- `STRIPE_SECRET_KEY` nunca debe estar expuesta públicamente.

## Ejecutar en producción

Para producción debes:

- usar claves `live` de Stripe en lugar de `test`
- servir el frontend compilado con `npm run build`
- proteger las variables de entorno
- deshabilitar el modo de prueba de Stripe en el panel de control
