import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice, calculateOrderTotal, formatWhatsAppMessage, generateWhatsAppLink } from '../../utils/formatters'
import { useState } from 'react'
import CheckoutModal from './CheckoutModal'

const Cart = () => {
    const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart()
    const [showCheckout, setShowCheckout] = useState(false)

    const orderTotal = calculateOrderTotal(cartItems)

    const handleCheckout = () => {
        setShowCheckout(true)
    }

    if (!isCartOpen) return null

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* Cart Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-soft-lg  animate-slide-left flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-light">
                    <h2 className="font-display text-2xl font-bold text-charcoal flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-sage-600" />
                        Your Order
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                        <X className="w-6 h-6 text-charcoal" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="text-charcoal-light font-medium mb-2">Your cart is empty</p>
                            <p className="text-sm text-charcoal-light">Add items from our menu to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.cartId} className="bg-cream-100 rounded-lg p-4">
                                    <div className="flex gap-4">
                                        {/* Image */}
                                        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image || '/images/placeholder.jpg'}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/images/placeholder.jpg'}
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-charcoal mb-1 line-clamp-1">{item.name}</h3>
                                            {item.options && Object.keys(item.options).length > 0 && (
                                                <p className="text-xs text-charcoal-light mb-2">
                                                    {Object.values(item.options).join(', ')}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-sage-600">{formatPrice(item.price)}</span>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                                        className="w-7 h-7 bg-white hover:bg-sage-50 rounded-full flex items-center justify-center transition-colors duration-200"
                                                    >
                                                        <Minus className="w-4 h-4 text-sage-600" />
                                                    </button>
                                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                                        className="w-7 h-7 bg-white hover:bg-sage-50 rounded-full flex items-center justify-center transition-colors duration-200"
                                                    >
                                                        <Plus className="w-4 h-4 text-sage-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => removeFromCart(item.cartId)}
                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200 self-start"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer with Totals */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-light p-6">
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-charcoal-light">Subtotal</span>
                                <span className="font-semibold">{formatPrice(orderTotal.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-charcoal-light">Delivery Fee</span>
                                <span className="font-semibold">{formatPrice(orderTotal.deliveryFee)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-charcoal-light">Tax</span>
                                <span className="font-semibold">{formatPrice(orderTotal.tax)}</span>
                            </div>
                            <div className="flex justify-between text-lg pt-2 border-t border-gray-light">
                                <span className="font-display font-bold">Total Amount</span>
                                <span className="font-display font-bold text-sage-600 text-xl">
                                    {formatPrice(orderTotal.total)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-sage-500 hover:bg-sage-600 text-white font-semibold py-4 rounded-lg transition-colors duration-300 shadow-soft btn-shimmer"
                        >
                            Proceed to Checkout →
                        </button>
                    </div>
                )}
            </div>

            {/* Checkout Modal */}
            {showCheckout && (
                <CheckoutModal
                    isOpen={showCheckout}
                    onClose={() => setShowCheckout(false)}
                    cartItems={cartItems}
                    orderTotal={orderTotal}
                />
            )}
        </>
    )
}

export default Cart
