import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/layout/Navbar'

import Footer from './components/layout/Footer'
import MinimalFooter from './components/layout/MinimalFooter'
import Home from './pages/Home'
import Menu from './pages/Menu'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Catering from './pages/Catering'
import Cart from './components/cart/Cart'
import { CartProvider } from './context/CartContext'
import ScrollToTop from './components/utils/ScrollToTop'

function App() {
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    // Add scroll listener for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Intersection Observer for scroll reveal animations
    // Re-runs when location changes to observe new elements after navigation
    useEffect(() => {
        // Small delay to ensure DOM has rendered after navigation
        const timeoutId = setTimeout(() => {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active')
                    }
                })
            }, observerOptions)

            // Observe all elements with reveal classes
            const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
            revealElements.forEach(el => observer.observe(el))

            // Cleanup function
            return () => observer.disconnect()
        }, 100)

        return () => clearTimeout(timeoutId)
    }, [location.pathname])

    return (
        <CartProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
                <Navbar scrolled={scrolled} />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/menu/:categoryId" element={<Menu />} />
                        <Route path="/product/:productId" element={<ProductDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/events" element={<Catering />} />
                    </Routes>
                </main>
                <FooterWrapper />
                <Cart />
            </div>
        </CartProvider>
    )
}

const FooterWrapper = () => {
    const location = useLocation()
    // Full footer on Home, About, and Catering pages
    const fullFooterPages = ['/', '/about', '/events']
    const showFullFooter = fullFooterPages.includes(location.pathname)

    return showFullFooter ? <Footer /> : <MinimalFooter />
}

export default App
