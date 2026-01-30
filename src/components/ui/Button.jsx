import { Link } from 'react-router-dom'

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    to,
    type = 'button',
    disabled = false,
    className = '',
    icon = null
}) => {
    const baseClasses = 'font-body font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2'

    const variantClasses = {
        primary: 'bg-sage-500 hover:bg-sage-600 text-white shadow-soft hover:shadow-soft-lg btn-shimmer',
        secondary: 'bg-white border-2 border-sage-500 text-sage-600 hover:bg-sage-50',
        outline: 'border-2 border-gray-light text-charcoal hover:border-sage-500 hover:text-sage-600',
        text: 'text-sage-600 hover:text-sage-700 hover:bg-sage-50'
    }

    const sizeClasses = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg'
    }

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`

    const content = (
        <>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </>
    )

    if (to) {
        return (
            <Link to={to} className={combinedClasses}>
                {content}
            </Link>
        )
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedClasses}
        >
            {content}
        </button>
    )
}

export default Button
