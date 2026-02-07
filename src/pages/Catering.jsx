import { ArrowRight, Phone, MessageCircle, Heart, Briefcase, PartyPopper, Users, Cake, Home as HomeIcon, GraduationCap, Baby, CheckCircle, Clock, Award, Truck } from 'lucide-react'
import Button from '../components/ui/Button'
import data from '../data/data.json'

const Catering = () => {
    const { brandInfo } = data

    // Events we cater for
    const events = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Weddings",
            description: "Make your special day unforgettable with our luxury catering services. From intimate ceremonies to grand celebrations."
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: "Corporate Events",
            description: "Impress clients and colleagues with premium business catering. Board meetings, conferences, and team celebrations."
        },
        {
            icon: <PartyPopper className="w-8 h-8" />,
            title: "Birthday Parties",
            description: "Celebrate in style with custom cakes, party platters, and themed catering packages for all ages."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Family Gatherings",
            description: "Bring everyone together with our delicious feast baskets. Perfect for reunions and holiday celebrations."
        },
        {
            icon: <Cake className="w-8 h-8" />,
            title: "Baby Showers",
            description: "Sweet and savory treats perfect for welcoming new arrivals. Customized packages for expecting parents."
        },
        {
            icon: <HomeIcon className="w-8 h-8" />,
            title: "House Warmings",
            description: "Help them settle in with our beautiful brunch baskets and finger food platters."
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Graduations",
            description: "Celebrate academic achievements with our special graduation packages and custom cakes."
        },
        {
            icon: <Baby className="w-8 h-8" />,
            title: "Naming Ceremonies",
            description: "Traditional and modern catering options for your child's naming ceremony."
        }
    ]

    // Why choose us
    const whyChooseUs = [
        {
            icon: <Award className="w-6 h-6" />,
            title: "Premium Quality",
            description: "Fresh ingredients, prepared daily with love and care by our expert chefs."
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Always On Time",
            description: "Reliable delivery at your specified time, guaranteed fresh and hot."
        },
        {
            icon: <Truck className="w-6 h-6" />,
            title: "Free Delivery",
            description: "Complimentary delivery within Accra for orders above GH₵500."
        },
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "Customizable Menus",
            description: "Tailored packages to match your event theme and dietary requirements."
        }
    ]

    return (
        <div className="pt-20">
            {/* Hero Section - Full Bleed with Gradient Overlay */}
            <section className="relative h-[500px] md:h-[600px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/finger-food.png"
                        alt="Catering spread"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-xl">
                            <p className="text-gold font-medium mb-2 text-lg">Catering Services</p>
                            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                                <span className="inline-block bg-sage-600/90 px-4 py-1 rounded-md">Making every event</span>
                                <br />
                                <span className="inline-block bg-sage-600/90 px-4 py-1 mt-2 rounded-md">unforgettable</span>
                            </h1>
                            <p className="text-cream-200 text-lg mb-8">
                                From intimate gatherings to grand celebrations
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button to="/menu" size="large">
                                    View Our Menu
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                                <a
                                    href={brandInfo.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors duration-200"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Get a Quote
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events We Cater For */}
            <section className="py-20 bg-cream-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                            Events We Cater For
                        </h2>
                        <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
                            Whatever the occasion, we have the perfect menu to make it memorable
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {events.map((event, index) => (
                            <div
                                key={event.title}
                                className={`reveal bg-white rounded-xl p-6 hover:shadow-soft-lg transition-all duration-300 card-lift stagger-${(index % 5) + 1}`}
                            >
                                <div className="w-14 h-14 bg-sage-500 text-white rounded-full flex items-center justify-center mb-4">
                                    {event.icon}
                                </div>
                                <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                                    {event.title}
                                </h3>
                                <p className="text-charcoal-light text-sm leading-relaxed">
                                    {event.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
                            Simple steps to bring gourmet catering to your event
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center reveal">
                            <div className="w-16 h-16 bg-sage-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                                1
                            </div>
                            <h3 className="font-display text-2xl font-bold text-charcoal mb-3">
                                Browse & Select
                            </h3>
                            <p className="text-charcoal-light">
                                Explore our menu and choose from our curated selection of breakfast baskets, lunch boxes, cakes, and party platters.
                            </p>
                        </div>

                        <div className="text-center reveal">
                            <div className="w-16 h-16 bg-sage-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                                2
                            </div>
                            <h3 className="font-display text-2xl font-bold text-charcoal mb-3">
                                Contact Us
                            </h3>
                            <p className="text-charcoal-light">
                                Reach out via WhatsApp or call us to discuss your event details, customizations, and delivery preferences.
                            </p>
                        </div>

                        <div className="text-center reveal">
                            <div className="w-16 h-16 bg-sage-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                                3
                            </div>
                            <h3 className="font-display text-2xl font-bold text-charcoal mb-3">
                                Enjoy Your Event
                            </h3>
                            <p className="text-charcoal-light">
                                We'll deliver fresh, beautifully presented food to your venue on time. Sit back and enjoy your celebration!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-sage-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="reveal">
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
                                Why Choose The Brunch Munch?
                            </h2>
                            <p className="text-lg text-charcoal-light mb-8">
                                With years of experience in luxury catering, we've perfected the art of creating memorable dining experiences for every occasion.
                            </p>

                            <div className="space-y-4">
                                {whyChooseUs.map((item) => (
                                    <div key={item.title} className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-12 h-12 bg-sage-500 text-white rounded-full flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-display text-lg font-semibold text-charcoal mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-charcoal-light text-sm">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="reveal">
                            <div className="bg-white rounded-2xl p-8 shadow-soft">
                                <h3 className="font-display text-2xl font-bold text-charcoal mb-6 text-center">
                                    Get a Free Quote
                                </h3>
                                <p className="text-charcoal-light mb-8 text-center">
                                    Tell us about your event and we'll create a custom package just for you.
                                </p>

                                <div className="space-y-4">
                                    <a
                                        href={brandInfo.whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-sage-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors duration-200"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        Chat on WhatsApp
                                    </a>

                                    <a
                                        href={`tel:${brandInfo.phone}`}
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-sage-600 text-white rounded-full font-medium hover:bg-sage-700 transition-colors duration-200"
                                    >
                                        <Phone className="w-5 h-5" />
                                        Call {brandInfo.phone}
                                    </a>
                                </div>

                                <p className="text-center text-sm text-charcoal-light mt-6">
                                    We typically respond within 30 minutes during business hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-charcoal text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                        Ready to Plan Your Event?
                    </h2>
                    <p className="text-xl text-cream-200 mb-8">
                        Browse our full menu and start building your perfect catering package today.
                    </p>
                    <Button to="/menu" size="large">
                        Explore Full Menu
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default Catering
