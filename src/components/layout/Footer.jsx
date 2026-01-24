import { Link } from 'react-router-dom'
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react'
import data from '../../data/data.json'

const Footer = () => {
    const { brandInfo } = data

    return (
        <footer className="bg-charcoal text-cream-100 pt-20 pb-10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section - Spans 4 columns */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center border border-sage-400/30">
                                <span className="text-white font-display text-2xl font-bold">B</span>
                            </div>
                            <span className="font-display text-2xl font-bold tracking-wide">The Brunch Munch</span>
                        </div>
                        <p className="text-cream-200/80 text-sm mb-8 leading-relaxed max-w-sm">
                            Experience the art of artisanal catering. From intimate gatherings to grand celebrations, we bring gourmet excellence to your doorstep.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href={`https://instagram.com/${brandInfo.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border border-cream-200/20 rounded-full flex items-center justify-center hover:bg-sage-500 hover:border-sage-500 transition-all duration-300 text-cream-200 hover:text-white"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 border border-cream-200/20 rounded-full flex items-center justify-center hover:bg-sage-500 hover:border-sage-500 transition-all duration-300 text-cream-200 hover:text-white"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h3 className="font-display text-lg font-semibold mb-6 text-sage-200">Explore</h3>
                        <ul className="space-y-4 text-sm font-medium tracking-wide">
                            <li><Link to="/menu" className="text-cream-200/80 hover:text-white transition-colors">Our Menu</Link></li>
                            <li><Link to="/events" className="text-cream-200/80 hover:text-white transition-colors">Catering</Link></li>
                            <li><Link to="/about" className="text-cream-200/80 hover:text-white transition-colors">The Story</Link></li>
                            <li><Link to="/gallery" className="text-cream-200/80 hover:text-white transition-colors">Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div className="lg:col-span-3">
                        <h3 className="font-display text-lg font-semibold mb-6 text-sage-200">Opening Hours</h3>
                        <ul className="space-y-4 text-sm text-cream-200/80">
                            <li className="flex justify-between border-b border-cream-200/10 pb-2">
                                <span>Mon - Fri</span>
                                <span className="text-white font-medium">8:00 AM - 8:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-cream-200/10 pb-2">
                                <span>Saturday</span>
                                <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-cream-200/10 pb-2">
                                <span>Sunday</span>
                                <span className="text-white font-medium">10:00 AM - 4:00 PM</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact - Spans 3 columns */}
                    <div className="lg:col-span-3">
                        <h3 className="font-display text-lg font-semibold mb-6 text-sage-200">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-sage-500/20 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-4 h-4 text-sage-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-cream-200/60 mb-1">PHONE</p>
                                    <a href={`tel:${brandInfo.phone}`} className="text-white hover:text-sage-400 transition-colors block">{brandInfo.phone}</a>
                                    <a href={`tel:${brandInfo.phone2}`} className="text-white hover:text-sage-400 transition-colors block">{brandInfo.phone2}</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-sage-500/20 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-4 h-4 text-sage-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-cream-200/60 mb-1">LOCATION</p>
                                    <span className="text-white leading-relaxed">{brandInfo.location}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-cream-200/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-cream-200/60">
                        <p>© {new Date().getFullYear()} {brandInfo.name}. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
