import { useRef } from 'react'
import MenuItemCard from './MenuItemCard'
import { ArrowRight } from 'lucide-react'

const ChefSpecialCarousel = ({ items = [] }) => {
    const scrollRef = useRef(null)

    const scrollBy = (distance) => {
        if (!scrollRef.current) return
        scrollRef.current.scrollBy({ left: distance, behavior: 'smooth' })
    }

    if (!items.length) return null

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {items.map((item) => (
                        <div key={item.id} className="flex-shrink-0 w-72">
                            <MenuItemCard item={item} />
                        </div>
                    ))}
                </div>

                <div className="hidden lg:block">
                    <button
                        onClick={() => scrollBy(-360)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-soft rounded-full flex items-center justify-center hover:bg-sage-50 transition-colors duration-200"
                    >
                        <ArrowRight className="w-6 h-6 text-sage-600 rotate-180" />
                    </button>
                    <button
                        onClick={() => scrollBy(360)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-soft rounded-full flex items-center justify-center hover:bg-sage-50 transition-colors duration-200"
                    >
                        <ArrowRight className="w-6 h-6 text-sage-600" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChefSpecialCarousel
