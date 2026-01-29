import { MapPin, Phone, Mail, Instagram, Clock, Heart, Award, Users, Utensils, MessageCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import data from '../data/data.json'

const About = () => {
    const { brandInfo } = data

    // Team values
    const values = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Made with Love",
            description: "Every dish we prepare is infused with passion and care, just like home-cooked meals."
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Premium Quality",
            description: "We source only the freshest ingredients to ensure exceptional taste in every bite."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Customer First",
            description: "Your satisfaction is our priority. We go above and beyond to exceed expectations."
        },
        {
            icon: <Utensils className="w-8 h-8" />,
            title: "Culinary Excellence",
            description: "Our expert chefs blend traditional Ghanaian flavors with modern gourmet techniques."
        }
    ]

    return (
        <div className="pt-20">
            {/* Hero Section - Full Bleed with Gradient Overlay */}
            <section className="relative h-[350px] md:h-[450px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/hero.png"
                        alt="Delicious gourmet food"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-lg">
                            <p className="text-gold font-medium mb-2 text-lg">About Us</p>
                            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                                <span className="inline-block bg-sage-600/90 px-4 py-1 rounded-md">Passionate about</span>
                                <br />
                                <span className="inline-block bg-sage-600/90 px-4 py-1 mt-2 rounded-md">great food</span>
                            </h1>
                            <p className="text-cream-200 text-lg">
                                Bringing gourmet brunch experiences to Accra, one basket at a time
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 bg-cream-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="reveal">
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-charcoal-light leading-relaxed">
                                <p>
                                    <strong className="text-charcoal">The Brunch Munch</strong> was born from a simple belief: that every celebration deserves exceptional food. What started as a passion project in a home kitchen has grown into Accra's premier gourmet catering service.
                                </p>
                                <p>
                                    We specialize in crafting beautiful brunch baskets, lunch boxes, custom cakes, and party platters that not only taste amazing but create lasting memories for our clients.
                                </p>
                                <p>
                                    From corporate events to intimate family gatherings, from wedding celebrations to baby showers, we've had the privilege of being part of thousands of special moments across Ghana.
                                </p>
                                <p>
                                    Every order we fulfill is prepared with the same love and attention to detail that we would give to our own family's celebration.
                                </p>
                            </div>
                        </div>

                        <div className="reveal">
                            <div className="bg-sage-600 rounded-2xl p-8 text-white">
                                <div className="grid grid-cols-2 gap-6 text-center">
                                    <div>
                                        <div className="font-display text-4xl md:text-5xl font-bold mb-2">10K+</div>
                                        <p className="text-cream-200">Happy Customers</p>
                                    </div>
                                    <div>
                                        <div className="font-display text-4xl md:text-5xl font-bold mb-2">5+</div>
                                        <p className="text-cream-200">Years of Service</p>
                                    </div>
                                    <div>
                                        <div className="font-display text-4xl md:text-5xl font-bold mb-2">50+</div>
                                        <p className="text-cream-200">Menu Items</p>
                                    </div>
                                    <div>
                                        <div className="font-display text-4xl md:text-5xl font-bold mb-2">100%</div>
                                        <p className="text-cream-200">Fresh Daily</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={value.title}
                                className={`reveal bg-cream-100 rounded-xl p-6 text-center hover:shadow-soft-lg transition-all duration-300 card-lift stagger-${(index % 5) + 1}`}
                            >
                                <div className="w-16 h-16 bg-sage-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="font-display text-xl font-bold text-charcoal mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-charcoal-light text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-20 bg-sage-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
                            We'd love to hear from you. Reach out to discuss your next event or place an order.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="reveal bg-white rounded-xl p-6 text-center shadow-soft">
                            <div className="w-14 h-14 bg-sage-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="font-display text-lg font-bold text-charcoal mb-2">Location</h3>
                            <p className="text-charcoal-light text-sm">{brandInfo.location}</p>
                        </div>

                        <div className="reveal bg-white rounded-xl p-6 text-center shadow-soft">
                            <div className="w-14 h-14 bg-sage-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="font-display text-lg font-bold text-charcoal mb-2">Phone</h3>
                            <a href={`tel:${brandInfo.phone}`} className="text-sage-600 hover:text-sage-700 text-sm font-medium">
                                {brandInfo.phone}
                            </a>
                        </div>

                        <div className="reveal bg-white rounded-xl p-6 text-center shadow-soft">
                            <div className="w-14 h-14 bg-sage-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Instagram className="w-6 h-6" />
                            </div>
                            <h3 className="font-display text-lg font-bold text-charcoal mb-2">Instagram</h3>
                            <p className="text-sage-600 text-sm font-medium">{brandInfo.instagram}</p>
                        </div>

                        <div className="reveal bg-white rounded-xl p-6 text-center shadow-soft">
                            <div className="w-14 h-14 bg-sage-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="font-display text-lg font-bold text-charcoal mb-2">Hours</h3>
                            <p className="text-charcoal-light text-sm">Mon - Sat: 8am - 8pm</p>
                        </div>
                    </div>

                    <div className="mt-12 text-center reveal">
                        <a
                            href={brandInfo.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors duration-200"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Chat with Us on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-charcoal text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                        Ready to Experience The Brunch Munch?
                    </h2>
                    <p className="text-xl text-cream-200 mb-8">
                        Explore our menu and let us make your next event unforgettable.
                    </p>
                    <Button to="/menu" size="large">
                        Explore Full Menu
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default About
