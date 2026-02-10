import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu as MenuIcon, X, ShoppingBag,  User } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const Navbar = ({ scrolled }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { getCartCount, setIsCartOpen } = useCart()
    const location = useLocation()

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Catering', path: '/events' },
        { name: 'About', path: '/about' }
    ]

    // Check if link is active (exact match for home, startsWith for others)
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/'
        }
        return location.pathname.startsWith(path)
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-soft' : 'bg-white/95 backdrop-blur-sm'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 transition-transform duration-300 group-hover:scale-110">
                            <img className='rounded-md' src="/images/brunch_logo.jpg" alt="Logo" />
                        </div>
                        <span className="font-display text-2xl text-charcoal font-semibold hidden sm:block">
                            The Brunch Munch
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-body font-medium transition-colors duration-200 relative group ${isActive(link.path)
                                    ? 'text-sage-600'
                                    : 'text-charcoal-light hover:text-sage-600'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-sage-600 transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-4">

                        {/* Cart Icon */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-2 hover:bg-sage-50 rounded-full transition-colors duration-200 relative"
                        >
                            <ShoppingBag className="w-5 h-5 text-charcoal-light" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-sage-600 text-white text-xs rounded-full flex items-center justify-center font-semibold pulse-glow">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 hover:bg-sage-50 rounded-full transition-colors duration-200"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-charcoal" />
                            ) : (
                                <MenuIcon className="w-6 h-6 text-charcoal" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-light animate-fade-in">
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block font-body font-medium py-2 transition-colors duration-200 ${isActive(link.path)
                                        ? 'text-sage-600 border-l-4 border-sage-600 pl-3'
                                        : 'text-charcoal hover:text-sage-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
