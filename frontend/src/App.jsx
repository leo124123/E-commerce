import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/nav'
import Footer from './components/Footer'
import PromoBadge from './components/PromoBadge'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <PromoBadge />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}