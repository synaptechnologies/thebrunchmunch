import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { Plus, Minus, Star, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../components/ui/Button'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatters'
import data from '../data/data.json'
import CakeConfigurator from '../components/cake/CakeConfigurator'

const ProductDetail = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [selectedOptions, setSelectedOptions] = useState({})

    // Get all products in a flat array for navigation
    const allProducts = useMemo(() => {
        const products = []
        data.categories.forEach(category => {
            category.subCategories.forEach(subCat => {
                if (subCat.items) {
                    subCat.items.forEach(item => {
                        products.push({ ...item, categoryId: category.id })
                    })
                }
            })
        })
        return products
    }, [])

    // Find current product index and get prev/next
    const currentIndex = allProducts.findIndex(p => p.id === productId)
    const prevProduct = currentIndex > 0 ? allProducts[currentIndex - 1] : null
    const nextProduct = currentIndex < allProducts.length - 1 ? allProducts[currentIndex + 1] : null

    const goToPrev = () => {
        if (prevProduct) {
            navigate(`/product/${prevProduct.id}`)
            setQuantity(1)
            setSelectedOptions({})
        }
    }

    const goToNext = () => {
        if (nextProduct) {
            navigate(`/product/${nextProduct.id}`)
            setQuantity(1)
            setSelectedOptions({})
        }
    }

    // Find the product and check if it's a cake
    let product = null
    let categoryInfo = null
    let isCakeProduct = false

    data.categories.forEach(category => {
        category.subCategories.forEach(subCat => {
            if (subCat.items) {
                const found = subCat.items.find(item => item.id === productId)
                if (found) {
                    product = found
                    categoryInfo = category
                    // Check if this is a cake product (subcategory type is "cake")
                    isCakeProduct = subCat.type === 'cake'
                }
            }
        })
    })

    if (!product) {
        return (
            <div className="pt-20 min-h-screen bg-cream-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-display text-3xl font-bold text-charcoal mb-4">Product Not Found</h1>
                    <Button to="/menu">Browse Menu</Button>
                </div>
            </div>
        )
    }

    // Render CakeConfigurator for cake products
    if (isCakeProduct) {
        return <CakeConfigurator product={product} categoryInfo={categoryInfo} />
    }

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedOptions)
    }

    return (
        
        <div className="pt-20 min-h-screen bg-cream-100 relative">
            {/* Previous/Next Navigation Arrows */}
            {prevProduct && (
                <button
                    onClick={goToPrev}
                    className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white shadow-soft-lg rounded-full flex items-center justify-center hover:bg-sage-50 transition-all duration-200 group"
                    title={`Previous: ${prevProduct.name}`}
                >
                    <ChevronLeft className="w-6 h-6 text-charcoal group-hover:text-sage-600" />
                </button>
            )}
            {nextProduct && (
                <button
                    onClick={goToNext}
                    className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white shadow-soft-lg rounded-full flex items-center justify-center hover:bg-sage-50 transition-all duration-200 group"
                    title={`Next: ${nextProduct.name}`}
                >
                    <ChevronRight className="w-6 h-6 text-charcoal group-hover:text-sage-600" />
                </button>
            )}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Image */}
                    <div className="reveal-left">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-soft sticky top-32">
                            <div className="aspect-square bg-gray-100">
                                <img
                                    src={product.image || '/images/placeholder.jpg'}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.src = '/images/placeholder.jpg'}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="reveal-right">
                        {/* Breadcrumb */}
                        <div className="text-sm text-charcoal-light mb-4">
                            <span>Menu</span> • <span>{categoryInfo?.title}</span> • <span className="text-sage-600">{product.name}</span>
                        </div>

                        <h1 className="font-display text-4xl font-bold text-charcoal mb-4">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-charcoal-light">4.8 (124 reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <span className="font-display text-4xl font-bold text-sage-600">{formatPrice(product.price)}</span>
                            {product.servings && (
                                <span className="ml-4 text-charcoal-light">for {product.servings}</span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-lg text-charcoal-light mb-6 leading-relaxed">{product.description}</p>

                        {/* What's Inside */}
                        {product.whatsInside && product.whatsInside.length > 0 && (
                            <div className="mb-6 bg-sage-50 rounded-xl p-6">
                                <h3 className="font-display text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
                                    <Check className="w-5 h-5 text-sage-600" />
                                    What's Inside
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {product.whatsInside.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2 text-charcoal-light">
                                            <span className="text-sage-600 mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Options (for cakes) */}
                        {product.options && product.options.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-semibold text-charcoal mb-3">Select Flavor</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.options.map(option => (
                                        <button
                                            key={option}
                                            onClick={() => setSelectedOptions({ flavor: option })}
                                            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${selectedOptions.flavor === option
                                                ? 'bg-sage-600 text-white shadow-soft'
                                                : 'bg-white text-charcoal shadow-sm hover:bg-sage-50'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-10">
                            <h3 className="font-semibold text-charcoal mb-4">Quantity</h3>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center bg-white rounded-full shadow-soft p-1">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-sage-50 transition-colors text-sage-600"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-sage-50 transition-colors text-sage-600"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                            onClick={handleAddToCart}
                            size="large"
                            className="w-full md:w-auto"
                        >
                            Add to Order - {formatPrice(product.price * quantity)}
                        </Button>

                        {/* Dietary Tags */}
                        {product.dietary && product.dietary.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-gray-light">
                                <div className="flex flex-wrap gap-2">
                                    {product.dietary.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
