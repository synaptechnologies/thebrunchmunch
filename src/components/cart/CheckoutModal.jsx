import { X, Phone, MapPin, Loader } from 'lucide-react'
import { useState } from 'react'
import { formatWhatsAppMessage, generateWhatsAppLink, formatPrice } from '../../utils/formatters'
import { useCart } from '../../context/CartContext'

const CheckoutModal = ({ isOpen, onClose, cartItems, orderTotal }) => {
    const { clearCart, setIsCartOpen } = useCart()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        date: '',
        time: '',
        specialRequests: ''
    })
    const [gettingLocation, setGettingLocation] = useState(false)
    const [gpsCoords, setGpsCoords] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // GPS Location handler
    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser')
            return
        }

        setGettingLocation(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setGpsCoords({ lat: latitude, lng: longitude })
                setFormData(prev => ({
                    ...prev,
                    location: `GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                }))
                setGettingLocation(false)
            },
            (error) => {
                console.error('Location error:', error)
                let errorMsg = 'Unable to get your location'
                if (error.code === 1) errorMsg = 'Location access denied. Please enable location permissions.'
                if (error.code === 2) errorMsg = 'Location unavailable. Please try again.'
                if (error.code === 3) errorMsg = 'Location request timed out. Please try again.'
                alert(errorMsg)
                setGettingLocation(false)
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Include GPS coordinates in form data for WhatsApp message
        const customerInfo = {
            ...formData,
            gpsCoords: gpsCoords
        }

        // Generate WhatsApp message
        const message = formatWhatsAppMessage(cartItems, customerInfo, orderTotal)
        const whatsappLink = generateWhatsAppLink(message)

        // Open WhatsApp
        window.open(whatsappLink, '_blank')

        // Clear cart and close modals
        clearCart()
        setIsCartOpen(false)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-soft-lg animate-scale-in">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-light p-6 flex items-center justify-between rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                            <span className="text-sage-600 font-display text-lg font-bold">B</span>
                        </div>
                        <span className="font-display text-lg font-semibold">The Brunch Munch</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                        <X className="w-5 h-5 text-charcoal" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h2 className="font-display text-2xl font-bold text-charcoal mb-2">Complete Your Order</h2>
                    <p className="text-sm text-charcoal-light mb-6">
                        Please fill in your details to finalize the delivery
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-100 transition-all duration-200"
                            />
                        </div>

                        {/* WhatsApp Number */}
                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-sage-600" />
                                WhatsApp Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+233 (555) 000-0000"
                                required
                                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-100 transition-all duration-200"
                            />
                        </div>

                        {/* Delivery Location */}
                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-sage-600" />
                                Delivery Location
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter delivery address"
                                    required
                                    className="flex-1 px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-100 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    disabled={gettingLocation}
                                    className="px-4 py-3 bg-sage-100 hover:bg-sage-200 text-sage-700 rounded-lg transition-all duration-200 flex items-center justify-center min-w-[52px] disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Get my current location"
                                >
                                    {gettingLocation ? (
                                        <Loader className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <MapPin className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {gpsCoords && (
                                <p className="text-xs text-sage-600 mt-1 flex items-center gap-1">
                                    <span>📍</span>
                                    <a
                                        href={`https://maps.google.com/?q=${gpsCoords.lat},${gpsCoords.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-sage-700"
                                    >
                                        View on Google Maps
                                    </a>
                                </p>
                            )}
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-100 transition-all duration-200"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">
                                    Time
                                </label>
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-100 transition-all duration-200"
                                >
                                    <option value="">Select</option>
                                    <option value="ASAP">ASAP</option>
                                    <option value="8:00 AM">8:00 AM</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="12:00 PM">12:00 PM</option>
                                    <option value="2:00 PM">2:00 PM</option>
                                    <option value="4:00 PM">4:00 PM</option>
                                    <option value="6:00 PM">6:00 PM</option>
                                </select>
                            </div>
                        </div>

                        {/* Special Requests */}
                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">
                                Special Requests / Allergies
                            </label>
                            <textarea
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                placeholder="e.g. No onions, sauce on the side..."
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-100 transition-all duration-200 resize-none"
                            ></textarea>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-cream-100 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span className="font-semibold">{formatPrice(orderTotal.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Delivery</span>
                                <span className="font-semibold">{formatPrice(orderTotal.deliveryFee)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Tax</span>
                                <span className="font-semibold">{formatPrice(orderTotal.tax)}</span>
                            </div>
                            <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-sage-200">
                                <span>Total</span>
                                <span className="text-sage-600">{formatPrice(orderTotal.total)}</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-sage-500 hover:bg-sage-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-soft btn-shimmer flex items-center justify-center gap-2"
                        >
                            <Phone className="w-5 h-5" />
                            Confirm Order via WhatsApp
                        </button>

                        <p className="text-xs text-center text-charcoal-light">
                            Order checkout powered by WhatsApp
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CheckoutModal
