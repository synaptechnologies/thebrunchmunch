import { useState } from 'react'
import { useParams } from 'react-router-dom'
import MenuItemCard from '../components/ui/MenuItemCard'
import data from '../data/data.json'

const Menu = () => {
    const { categoryId } = useParams()
    const { categories } = data
    const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all')

    // Get all items
    const getAllItems = () => {
        let allItems = []
        categories.forEach(category => {
            category.subCategories.forEach(subCat => {
                if (subCat.items) {
                    subCat.items.forEach(item => {
                        allItems.push({ ...item, categoryId: category.id, categoryTitle: category.title })
                    })
                }
            })
        })
        return allItems
    }

    const allItems = getAllItems()
    const filteredItems = selectedCategory === 'all'
        ? allItems
        : allItems.filter(item => item.categoryId === selectedCategory)

    return (
        <div className="pt-20 min-h-screen bg-cream-100">
            {/* Hero Section - Full Bleed with Gradient Overlay */}
            <section className="relative h-[350px] md:h-[450px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/breakfast-basket.png"
                        alt="Our delicious menu"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-lg">
                            <p className="text-gold font-medium mb-2 text-lg">Our Menu</p>
                            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                                <span className="inline-block bg-sage-600/90 px-4 py-1">Crafted for moments</span>
                                <br />
                                <span className="inline-block bg-sage-600/90 px-4 py-1 mt-2">worth sharing</span>
                            </h1>
                            <p className="text-cream-200 text-lg">
                                Freshly prepared artisan meals, perfect for any occasion
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filters */}
            <section className="bg-white shadow-soft sticky top-20 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${selectedCategory === 'all'
                                ? 'bg-sage-500 text-white'
                                : 'bg-cream-100 text-charcoal hover:bg-sage-50'
                                }`}
                        >
                            All
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${selectedCategory === category.id
                                    ? 'bg-sage-500 text-white'
                                    : 'bg-cream-100 text-charcoal hover:bg-sage-50'
                                    }`}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Menu Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item, index) => (
                            <div key={item.id} className={`reveal stagger-${(index % 5) + 1}`}>
                                <MenuItemCard item={item} categoryId={item.categoryId} />
                            </div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-charcoal-light text-lg">No items found in this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Menu
