import { ArrowRight, Truck, Clock, Award, Star, Heart, Users, Cake, Briefcase, PartyPopper, Home as HomeIcon, Quote, ShoppingBag } from 'lucide-react'
import Button from '../components/ui/Button'
import CategoryCard from '../components/ui/CategoryCard'
import data from '../data/data.json'
import { useRef } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatters'

const Home = () => {
    const { categories } = data
    const scrollRef = useRef(null)
    const { addToCart } = useCart()

    // Chef's Special - Featured Product
    const chefsSpecial = {
        id: 'pearllunchbasket',
        name: 'The Pearl Lunch Basket',
        subtitle: 'Our Signature Feast',
        description: 'Signature Jollof, Veggie Egg Fried Rice, Egg & Sausage Spaghetti, Salad, Fried Chicken, Sausages, Fried Plantain, Tuna Sandwiches, Pancakes, Fruits, Juice & more.',
        serves: '6-8 people',
        price: 900.00,
        image: '/images/pearllunchbasket.png'
    }

    const handleAddToCart = () => {
        addToCart(chefsSpecial, 1)
    }

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' })
    }

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' })
    }

    // Events we cater for
    const events = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Weddings",
            description: "Make your special day unforgettable with our luxury catering services"
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: "Corporate Events",
            description: "Impress clients and colleagues with premium business catering"
        },
        {
            icon: <PartyPopper className="w-8 h-8" />,
            title: "Birthday Parties",
            description: "Celebrate in style with custom cakes and party platters"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Family Gatherings",
            description: "Bring everyone together with our delicious feast baskets"
        },
        {
            icon: <Cake className="w-8 h-8" />,
            title: "Baby Showers",
            description: "Sweet and savory treats perfect for welcoming new arrivals"
        },
        {
            icon: <HomeIcon className="w-8 h-8" />,
            title: "House Warmings",
            description: "Help them settle in with our beautiful brunch baskets"
        }
    ]

    // Customer reviews
    const reviews = [
        {
            name: "Akua Mensah",
            role: "Event Planner",
            rating: 5,
            text: "The Brunch Munch catered our corporate event and exceeded all expectations. The presentation was stunning and the food was absolutely delicious!",
            image: "https://ui-avatars.com/api/?name=Akua+Mensah&background=6B8F71&color=fff&size=200"
        },
        {
            name: "Kwame Osei",
            role: "Wedding Client",
            rating: 5,
            text: "Our wedding guests are still talking about the amazing breakfast baskets. Professional service from start to finish. Highly recommend!",
            image: "https://ui-avatars.com/api/?name=Kwame+Osei&background=6B8F71&color=fff&size=200"
        },
        {
            name: "Ama Boateng",
            role: "Birthday Celebration",
            rating: 5,
            text: "The custom cake and party platter were a huge hit at my daughter's birthday. Everything was fresh, beautifully packaged, and tasted incredible!",
            image: "https://ui-avatars.com/api/?name=Ama+Boateng&background=6B8F71&color=fff&size=200"
        },
        {
            name: "Michael Adjei",
            role: "Corporate Client",
            rating: 5,
            text: "We order from The Brunch Munch every week for our office meetings. Consistent quality, on-time delivery, and amazing customer service!",
            image: "https://ui-avatars.com/api/?name=Michael+Adjei&background=6B8F71&color=fff&size=200"
        }
    ]

    return (
        <div className="pt-20">
            {/* Hero Section - Full Bleed with Gradient Overlay */}
            <section className="relative h-[600px] md:h-[700px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/hero.png"
                        alt="Gourmet brunch spread"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Gradient Overlay - Left to Right */}
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-xl reveal">
                            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                <span className="inline-block bg-sage-600/90 px-4 py-1 mb-2 rounded-md">Gourmet Brunch,</span>
                                <br />
                                <span className="inline-block bg-sage-600/90 px-4 py-1 rounded-md">Delivered to You</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-cream-100 mb-8">
                                Luxury catering for corporate events, celebrations, and everyday indulgence
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button to="/menu" size="large">
                                    Explore Our Menu
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                                <Button variant="outline" size="large" className="border-white text-white hover:bg-white/10">
                                    Call Us: +233 53 045 8727
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Scroller */}
            <section className="bg-sage-600 py-4 overflow-hidden">
                <div className="auto-scroll flex gap-12 text-white">
                    {[...(new Array(3))].map((_, idx) => (
                        <div key={idx} className="flex gap-12 flex-shrink-0">
                            <div className="flex items-center gap-3 whitespace-nowrap">
                                <Truck className="w-5 h-5" />
                                <span className="font-medium">Free Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 whitespace-nowrap">
                                <Clock className="w-5 h-5" />
                                <span className="font-medium">Same Day Available</span>
                            </div>
                            <div className="flex items-center gap-3 whitespace-nowrap">
                                <Award className="w-5 h-5" />
                                <span className="font-medium">Premium Quality</span>
                            </div>
                            <div className="flex items-center gap-3 whitespace-nowrap">
                                <Star className="w-5 h-5" />
                                <span className="font-medium">10K+ Happy Customers</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Explore Our Menu */}
            <section className="py-20 bg-cream-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 reveal">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                            Explore Our Menu
                        </h2>
                        <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
                            From breakfast baskets to luxury lunch platters, discover our curated selection
                        </p>
                    </div>

                    {/* Category Carousel */}
                    <div className="relative">
                        <div
                            ref={scrollRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {categories.map((category, index) => (
                                <div key={category.id} className={`reveal-left stagger-${(index % 5) + 1}`}>
                                    <CategoryCard category={category} />
                                </div>
                            ))}
                        </div>

                        {/* Navigation Buttons - Desktop Only */}
                        <div className="hidden lg:block">
                            <button
                                onClick={scrollLeft}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-soft rounded-full flex items-center justify-center hover:bg-sage-50 transition-colors duration-200"
                            >
                                <ArrowRight className="w-6 h-6 text-sage-600 rotate-180" />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-soft rounded-full flex items-center justify-center hover:bg-sage-50 transition-colors duration-200"
                            >
                                <ArrowRight className="w-6 h-6 text-sage-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chef's Special - Full Width Promo */}
            <section className="py-12 bg-cream-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-yellow-800 rounded-2xl overflow-hidden shadow-soft-lg reveal">
                        <div className="flex flex-col lg:flex-row min-h-[350px]">
                            {/* Left Content */}
                            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <span className="text-white text-sm font-semibold tracking-widest uppercase mb-3">
                                    Chef's Special
                                </span>
                                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                                    {chefsSpecial.name}
                                </h2>
                                <p className="text-amber-200 text-sm mb-4">{chefsSpecial.subtitle} • Feeds {chefsSpecial.serves}</p>
                                <p className="text-cream-200 text-base leading-relaxed mb-6 max-w-lg">
                                    {chefsSpecial.description}
                                </p>
                                <div className="flex items-center gap-6">
                                    <span className="font-display text-3xl font-bold text-white">
                                        {formatPrice(chefsSpecial.price)}
                                    </span>
                                    <button
                                        onClick={handleAddToCart}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-900 rounded-full font-semibold hover:bg-cream-100 transition-colors duration-200 shadow-soft"
                                    >
                                        <ShoppingBag className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            {/* Right Image */}
                            <div className="lg:w-1/2 relative min-h-[250px] lg:min-h-full">
                                <img
                                    src={chefsSpecial.image}
                                    alt={chefsSpecial.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => e.target.src = '/images/lunch.png'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events We Cater For */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                            Events We Cater For
                        </h2>
                        <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
                            From intimate gatherings to grand celebrations, we bring luxury catering to every occasion
                        </p>
                    </div>

                    {/* Events Carousel - Horizontal Scroll */}
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {events.map((event, index) => (
                            <div
                                key={event.title}
                                className={`flex-shrink-0 w-64 bg-cream-100 rounded-xl p-6 hover:shadow-soft-lg transition-all duration-300 card-lift`}
                            >
                                <div className="w-12 h-12 bg-sage-500 text-white rounded-full flex items-center justify-center mb-4">
                                    {event.icon}
                                </div>
                                <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                                    {event.title}
                                </h3>
                                <p className="text-charcoal-light text-sm leading-relaxed">
                                    {event.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button to="/events" size="large">
                            View All Catering Packages
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="py-20 bg-sage-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                            What Our Clients Say
                        </h2>
                        <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust us for their special moments
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {reviews.map((review, index) => (
                            <div
                                key={review.name}
                                className={`reveal bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 card-lift stagger-${(index % 5) + 1}`}
                            >
                                {/* Quote Icon */}
                                <div className="mb-4">
                                    <Quote className="w-10 h-10 text-sage-400" />
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-charcoal-light mb-6 leading-relaxed text-sm">
                                    "{review.text}"
                                </p>

                                {/* Customer Info */}
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-light">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-charcoal">{review.name}</h4>
                                        <p className="text-sm text-charcoal-light">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-charcoal text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="reveal-left">
                            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                                Why Choose The Brunch Munch?
                            </h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-semibold mb-2">Premium Quality</h3>
                                        <p className="text-cream-200 position: fixed">Fresh ingredients, prepared daily with love and care by our expert chefs.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-semibold mb-2">Always On Time</h3>
                                        <p className="text-cream-200">Reliable delivery at your specified time, guaranteed fresh and hot.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center">
                                        <Heart className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-semibold mb-2">Made with Love</h3>
                                        <p className="text-cream-200">Every dish is crafted with passion and attention to detail.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-semibold mb-2">Customer First</h3>
                                        <p className="text-cream-200">Your satisfaction is our priority. Custom orders always welcome!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="reveal-right">
                            <div className="bg-sage-600 rounded-2xl p-8 text-center">
                                <h3 className="font-display text-3xl font-bold mb-4">Ready to Order?</h3>
                                <p className="text-cream-200 mb-8 text-lg">
                                    Browse our menu and place your order via WhatsApp for instant confirmation
                                </p>
                                <Button to="/menu" size="large" className="w-full sm:w-auto">
                                    Start Ordering Now
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                                <p className="mt-6 text-cream-200">
                                    Or call us: <a href="tel:+233530458727" className="font-semibold text-white hover:text-sage-300">+233 53 045 8727</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
