import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={`/menu/${category.id}`}
            className="group relative block w-full min-w-[280px] md:min-w-[320px] h-64 md:h-80 rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-500 flex-shrink-0"
        >
            {/* Image Background */}
            <div className="absolute inset-0 bg-gray-200">
                <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = '/images/placeholder.jpg'
                        e.target.onerror = null
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    {category.title}
                </h3>
                <p className="text-cream-200 text-sm md:text-base line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-y-4 group-hover:translate-y-0">
                    {category.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sage-300 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 transform translate-x-[-10px] group-hover:translate-x-0">
                    <span>Explore Menu</span>
                    <ChevronRight className="w-5 h-5" />
                </div>
            </div>
        </Link>
    )
}

export default CategoryCard
