import { useState, useEffect } from 'react'
import { Check, Sparkles, Flower2, Award, MessageSquare, ShoppingBag, HelpCircle } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatters'

// Cake sizes with pricing and serving info
const CAKE_SIZES = [
    { id: '5inch', label: '5 inch', serves: '6-10', basePrice: 200 },
    { id: '6inch', label: '6 inch', serves: '14-16', basePrice: 400 },
    { id: '8inch', label: '8 inch', serves: '10-20', basePrice: 600 },
    { id: '10inch', label: '10 inch', serves: '20-30', basePrice: 800 },
]

// Cake flavors with additional pricing
const CAKE_FLAVORS = [
    { id: 'vanilla', name: 'Classic Vanilla Bean', description: 'Light sponge with vanilla buttercream', price: 0, included: true },
    { id: 'chocolate', name: 'Double Dark Chocolate', description: 'Rich ganache filling with cocoa nibs', price: 5 },
    { id: 'lemon-raspberry', name: 'Lemon Zest & Raspberry', description: 'Tangy curd with fresh berry compote', price: 8 },
    { id: 'red-velvet', name: 'Red Velvet', description: 'Classic cream cheese frosting', price: 5 },
    { id: 'caramel', name: 'Caramel Drizzle', description: 'Butterscotch layers with caramel swirl', price: 5 },
    { id: 'strawberry', name: 'Strawberry Delight', description: 'Fresh strawberry cream layers', price: 5 },
]

// Add-on options
const CAKE_ADDONS = [
    { id: 'gold-leaf', name: '24k Gold Leaf', description: 'Add elegant shimmer', price: 5, icon: Sparkles },
    { id: 'fresh-flowers', name: 'Fresh Flowers', description: 'Seasonal blooms', price: 12, icon: Flower2 },
    { id: 'acrylic-topper', name: 'Acrylic Topper', description: '"Happy Birthday"', price: 8, icon: Award },
]

const CakeConfigurator = ({ product, categoryInfo }) => {
    const { addToCart } = useCart()

    // State for selections
    const [selectedSize, setSelectedSize] = useState(CAKE_SIZES[0])
    const [selectedFlavor, setSelectedFlavor] = useState(CAKE_FLAVORS[0])
    const [selectedAddons, setSelectedAddons] = useState([])
    const [cakeWriting, setCakeWriting] = useState('')

    // Calculate total price
    const calculateTotal = () => {
        let total = selectedSize.basePrice
        total += selectedFlavor.price
        selectedAddons.forEach(addon => {
            const addonItem = CAKE_ADDONS.find(a => a.id === addon)
            if (addonItem) total += addonItem.price
        })
        return total
    }

    const totalPrice = calculateTotal()
    const extrasPrice = selectedFlavor.price + selectedAddons.reduce((sum, id) => {
        const addon = CAKE_ADDONS.find(a => a.id === id)
        return sum + (addon ? addon.price : 0)
    }, 0)

    // Toggle addon selection
    const toggleAddon = (addonId) => {
        setSelectedAddons(prev =>
            prev.includes(addonId)
                ? prev.filter(id => id !== addonId)
                : [...prev, addonId]
        )
    }

    // Handle add to cart
    const handleAddToCart = () => {
        const cakeProduct = {
            ...product,
            name: `${selectedSize.label} ${product.name.replace(/\d+"\s*/, '')}`,
            price: totalPrice,
        }

        const options = {
            size: selectedSize.label,
            serves: selectedSize.serves,
            flavor: selectedFlavor.name,
            addons: selectedAddons.map(id => CAKE_ADDONS.find(a => a.id === id)?.name).filter(Boolean),
            writing: cakeWriting || null
        }

        addToCart(cakeProduct, 1, options)
    }

    return (
        <div className="pt-20 min-h-screen bg-cream-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Image & Main Options */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Hero Image */}
                        <div className="bg-charcoal rounded-2xl overflow-hidden shadow-soft-lg relative">
                            <div className="aspect-[4/3] relative">
                                <img
                                    src={product.image || '/images/cakes/signature-cake.jpg'}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.src = '/images/placeholder.jpg'}
                                />
                                <div className="absolute bottom-4 right-4 bg-charcoal/80 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <span className="text-cream-100 text-sm font-medium tracking-wide">SIGNATURE SERIES</span>
                                </div>
                            </div>
                        </div>

                        {/* Product Title */}
                        <div>
                            <h1 className="font-display text-4xl font-bold text-charcoal mb-3">{product.name.replace(/\d+"\s*/, '')}</h1>
                            <p className="text-lg text-charcoal-light leading-relaxed">
                                {product.description || 'A timeless classic made with premium Madagascar vanilla beans, layered with silky swiss meringue buttercream.'}
                            </p>
                        </div>

                        {/* Size Selection */}
                        <div className="reveal-up">
                            <h3 className="font-display text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                                Choose Size
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {CAKE_SIZES.map(size => (
                                    <button
                                        key={size.id}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-full font-medium transition-all duration-200 border-2 ${selectedSize.id === size.id
                                            ? 'bg-sage-500 text-white border-sage-500 shadow-soft'
                                            : 'bg-white text-charcoal border-gray-light hover:border-sage-300'
                                            }`}
                                    >
                                        {size.label}
                                        <span className="text-xs ml-1 opacity-70">(Feeds {size.serves})</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Flavor Selection */}
                        <div className="reveal-up">
                            <h3 className="font-display text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                                Select Flavor
                            </h3>
                            <div className="space-y-3">
                                {CAKE_FLAVORS.map(flavor => (
                                    <button
                                        key={flavor.id}
                                        onClick={() => setSelectedFlavor(flavor)}
                                        className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 flex items-center justify-between ${selectedFlavor.id === flavor.id
                                            ? 'bg-sage-50 border-sage-500 shadow-soft'
                                            : 'bg-white border-gray-light hover:border-sage-200'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedFlavor.id === flavor.id
                                                ? 'bg-sage-500 border-sage-500'
                                                : 'border-gray-300'
                                                }`}>
                                                {selectedFlavor.id === flavor.id && (
                                                    <Check className="w-3 h-3 text-white" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-charcoal">{flavor.name}</p>
                                                <p className="text-sm text-charcoal-light">{flavor.description}</p>
                                            </div>
                                        </div>
                                        <span className={`font-medium ${flavor.included ? 'text-sage-600' : 'text-charcoal'}`}>
                                            {flavor.included ? 'Included' : `+${formatPrice(flavor.price)}`}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add-ons */}
                        <div className="reveal-up">
                            <h3 className="font-display text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                                Add a Personal Touch
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {CAKE_ADDONS.map(addon => {
                                    const Icon = addon.icon
                                    const isSelected = selectedAddons.includes(addon.id)
                                    return (
                                        <button
                                            key={addon.id}
                                            onClick={() => toggleAddon(addon.id)}
                                            className={`p-4 rounded-xl text-center transition-all duration-200 border-2 ${isSelected
                                                ? 'bg-sage-50 border-sage-500 shadow-soft'
                                                : 'bg-white border-gray-light hover:border-sage-200'
                                                }`}
                                        >
                                            <div className="w-16 h-16 mx-auto mb-3 bg-cream-100 rounded-xl flex items-center justify-center">
                                                <Icon className={`w-8 h-8 ${isSelected ? 'text-sage-600' : 'text-charcoal-light'}`} />
                                            </div>
                                            <p className="font-semibold text-charcoal text-sm">{addon.name}</p>
                                            <p className="text-xs text-charcoal-light mb-2">{addon.description}</p>
                                            <p className="text-sage-600 font-medium">+{formatPrice(addon.price)}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Cake Writing */}
                        <div className="reveal-up">
                            <h3 className="font-display text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-sm">4</span>
                                Writing on Cake
                            </h3>
                            <div className="bg-white rounded-xl border-2 border-gray-light p-4">
                                <textarea
                                    value={cakeWriting}
                                    onChange={(e) => setCakeWriting(e.target.value.slice(0, 50))}
                                    placeholder="e.g. Happy 30th Birthday Sarah!"
                                    className="w-full p-3 border border-gray-light rounded-lg focus:outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-100 transition-all duration-200 resize-none"
                                    rows="2"
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-charcoal-light">Max 50 characters</span>
                                    <button
                                        onClick={() => setCakeWriting('')}
                                        className="text-xs text-sage-600 hover:text-sage-700 font-medium"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Order Summary (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-soft-lg p-6 sticky top-24">
                            <h3 className="font-display text-xl font-semibold text-charcoal mb-2">Order Summary</h3>
                            <p className="text-sm text-charcoal-light mb-6">Customizing your {product.name.replace(/\d+"\s*/, '')}</p>

                            {/* Order Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-charcoal">{selectedSize.label} Cake</p>
                                        <p className="text-xs text-charcoal-light">Base Size</p>
                                    </div>
                                    <span className="font-semibold">{formatPrice(selectedSize.basePrice)}</span>
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-charcoal">{selectedFlavor.name}</p>
                                        <p className="text-xs text-charcoal-light">Included flavor</p>
                                    </div>
                                    <span className="font-semibold">{selectedFlavor.price > 0 ? `+${formatPrice(selectedFlavor.price)}` : formatPrice(0)}</span>
                                </div>

                                {selectedAddons.length > 0 && (
                                    <div className="pt-2 border-t border-gray-light">
                                        {selectedAddons.map(addonId => {
                                            const addon = CAKE_ADDONS.find(a => a.id === addonId)
                                            return addon && (
                                                <div key={addonId} className="flex justify-between items-center py-1">
                                                    <span className="text-sm text-charcoal">{addon.name}</span>
                                                    <span className="text-sm font-medium">+{formatPrice(addon.price)}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {cakeWriting && (
                                    <div className="flex justify-between items-start pt-2 border-t border-gray-light">
                                        <div>
                                            <p className="text-sm text-charcoal">Cake Writing</p>
                                            <p className="text-xs text-charcoal-light italic">"{cakeWriting}"</p>
                                        </div>
                                        <span className="text-sm text-sage-600">Free</span>
                                    </div>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="border-t border-gray-light pt-4 space-y-2 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-charcoal-light">Base Price</span>
                                    <span>{formatPrice(selectedSize.basePrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-charcoal-light">Extras</span>
                                    <span>{formatPrice(extrasPrice)}</span>
                                </div>
                                <div className="flex justify-between font-display text-xl font-bold pt-2 border-t border-dashed border-gray-light">
                                    <span>Total</span>
                                    <span className="text-sage-600">{formatPrice(totalPrice)}</span>
                                </div>
                            </div>

                            {/* Add to Order Button */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-sage-500 hover:bg-sage-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-soft btn-shimmer flex items-center justify-center gap-2"
                            >
                                Add to Order
                                <ShoppingBag className="w-5 h-5" />
                            </button>

                            <p className="text-xs text-center text-charcoal-light mt-3 flex items-center justify-center gap-1">
                                <Check className="w-3 h-3 text-sage-500" />
                                Ready for pickup in 24-48 hours
                            </p>

                            {/* Help Link */}
                            <div className="mt-6 pt-4 border-t border-gray-light">
                                <a href="#" className="flex items-center gap-2 text-sm text-charcoal-light hover:text-sage-600 transition-colors">
                                    <HelpCircle className="w-4 h-4" />
                                    Need help customizing?
                                    <span className="text-sage-600 font-medium">Chat with a baker</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CakeConfigurator
