import { Link } from 'react-router-dom'
import data from '../../data/data.json'

const MinimalFooter = () => {
    const { brandInfo } = data

    return (
        <footer className="bg-white border-t border-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-display font-bold">B</span>
                        </div>
                        <span className="font-display font-semibold text-charcoal">{brandInfo.name}</span>
                    </div>

                    <div className="text-sm text-charcoal-light">
                        © {new Date().getFullYear()} All rights reserved.
                    </div>

                    <div className="flex gap-6 text-sm text-charcoal-light">
                        <Link to="/menu" className="hover:text-sage-600 transition-colors">Menu</Link>
                        <Link to="/about" className="hover:text-sage-600 transition-colors">About</Link>
                        <a href={`tel:${brandInfo.phone}`} className="hover:text-sage-600 transition-colors">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default MinimalFooter
