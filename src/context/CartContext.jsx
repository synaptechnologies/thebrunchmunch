import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart from localStorage on init (defensive parse)
        try {
            const savedCart = localStorage.getItem('brunchMunchCart')
            return savedCart ? JSON.parse(savedCart) : []
        } catch (err) {
            console.error('Failed to parse saved cart from localStorage:', err)
            // Clear corrupted data to avoid repeated errors
            try { localStorage.removeItem('brunchMunchCart') } catch (e) {}
            return []
        }
    })
    const [isCartOpen, setIsCartOpen] = useState(false)

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('brunchMunchCart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (item, quantity = 1, options = {}) => {
        setCartItems(prev => {
            // Check if item with same options already exists
            const existingIndex = prev.findIndex(
                cartItem => cartItem.id === item.id &&
                    JSON.stringify(cartItem.options) === JSON.stringify(options)
            )

            if (existingIndex > -1) {
                // Update quantity
                const updated = [...prev]
                updated[existingIndex].quantity += quantity
                return updated
            } else {
                // Add new item with a safer short unique id
                const cartId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
                return [...prev, { ...item, quantity, options, cartId }]
            }
        })
        setIsCartOpen(true)
    }

    const removeFromCart = (cartId) => {
        setCartItems(prev => prev.filter(item => item.cartId !== cartId))
    }

    const updateQuantity = (cartId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(cartId)
        } else {
            setCartItems(prev =>
                prev.map(item =>
                    item.cartId === cartId ? { ...item, quantity: newQuantity } : item
                )
            )
        }
    }

    const clearCart = () => {
        setCartItems([])
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0)
    }

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isCartOpen,
        setIsCartOpen
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
