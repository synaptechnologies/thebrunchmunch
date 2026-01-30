import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { formatPrice } from '../../utils/formatters'
import { useCart } from '../../context/CartContext'

const MenuItemCard = ({ item, categoryId }) => {
    const { addToCart } = useCart()
    const imageUrl = item.image || '/images/placeholder.jpg'

    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(item, 1)
    }

    return (
        <Link
            to={`/product/${item.id}`}
            className="group block bg-white rounded-xl overflow-hidden card-lift shadow-soft hover:shadow-card-hover h-full flex flex-col"
        >
            {/* Image */}
            <div className="image-zoom-container aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img
                    src={imageUrl}
                    alt={item.name}
                    className="image-zoom w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = '/images/placeholder.jpg'
                    }}
                />
                {item.featured && (
                    <div className="absolute top-4 left-4 bg-sage-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-semibold text-charcoal mb-2 group-hover:text-sage-600 transition-colors duration-200 line-clamp-1">
                    {item.name}
                </h3>

                {item.servings && (
                    <p className="text-sm text-sage-600 font-medium mb-2">{item.servings}</p>
                )}

                <p className="text-sm text-charcoal-light mb-4 line-clamp-2 leading-relaxed">
                    {item.description || item.whatsInside?.slice(0, 3).join(', ')}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="font-display text-2xl font-bold text-sage-600">
                        {formatPrice(item.price)}
                    </span>

                    <button
                        onClick={handleAddToCart}
                        className="w-10 h-10 bg-sage-500 hover:bg-sage-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-soft"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default MenuItemCard
