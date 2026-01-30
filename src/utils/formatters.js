// Utility functions for formatting

export const formatPrice = (price) => {
    return `GHC ${price.toFixed(2)}`
}

export const formatWhatsAppMessage = (cartItems, customerInfo, orderTotal) => {
    const orderNumber = `TR-${Math.floor(1000 + Math.random() * 9000)}`

    let message = `🍽️ *NEW ORDER - The Brunch Munch*\n\n`
    message += `📋 *Order Details:*\n`

    cartItems.forEach(item => {
        message += `• ${item.name}`

        // Add options if exists (for cakes, etc.)
        if (item.options && Object.keys(item.options).length > 0) {
            const optionsList = []
            if (item.options.size) optionsList.push(`Size: ${item.options.size}`)
            if (item.options.flavor) optionsList.push(`Flavor: ${item.options.flavor}`)
            if (item.options.addons && item.options.addons.length > 0) {
                optionsList.push(`Add-ons: ${item.options.addons.join(', ')}`)
            }
            if (item.options.writing) optionsList.push(`Writing: "${item.options.writing}"`)

            // For non-cake options (legacy support)
            if (optionsList.length === 0) {
                const optionsStr = Object.values(item.options).filter(v => v).join(', ')
                if (optionsStr) optionsList.push(optionsStr)
            }

            if (optionsList.length > 0) {
                message += `\n   ${optionsList.join('\n   ')}`
            }
        }

        message += ` × ${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`
    })

    message += `\n💰 *Order Summary:*\n`
    message += `Subtotal: ${formatPrice(orderTotal.subtotal)}\n`
    message += `Delivery Fee: ${formatPrice(orderTotal.deliveryFee)}\n`
    message += `Tax: ${formatPrice(orderTotal.tax)}\n`
    message += `*Total: ${formatPrice(orderTotal.total)}*\n\n`

    message += `👤 *Customer Information:*\n`
    message += `Name: ${customerInfo.name}\n`
    message += `Phone: ${customerInfo.phone}\n\n`

    message += `📍 *Delivery Location:*\n`
    message += `${customerInfo.location}\n`
    if (customerInfo.gpsCoords) {
        message += `Maps: https://maps.google.com/?q=${customerInfo.gpsCoords.lat},${customerInfo.gpsCoords.lng}\n`
    }
    message += `\n`

    message += `📅 *Delivery Details:*\n`
    message += `Date: ${customerInfo.date}\n`
    message += `Time: ${customerInfo.time}\n\n`

    if (customerInfo.specialRequests) {
        message += `📝 *Special Requests:*\n${customerInfo.specialRequests}\n\n`
    }

    message += `---\nOrder #${orderNumber}`

    return message
}

export const generateWhatsAppLink = (message, phoneNumber = '233530458727') => {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}

export const calculateOrderTotal = (cartItems, deliveryFeeRate = 20, taxRate = 0.02) => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    const deliveryFee = deliveryFeeRate
    const tax = subtotal * taxRate
    const total = subtotal + deliveryFee + tax

    return {
        subtotal,
        deliveryFee,
        tax,
        total
    }
}
