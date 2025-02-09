
export const useProduct = (product: any) => {
    const featuredImage = computed(() => {
        let image = '/images/logo.svg'

        if (product?.images.length > 0) {
            const featuredImage = product?.images.find((image: any) => image.featured)
            if (featuredImage)
                image = featuredImage?.images?.url as string
        }

        return image
    })

    const currentPrice = computed(() => {
        let price

        if (product?.prices.length > 0) {
            const pricedProduct = product?.prices[product?.prices.length - 1]
            price = pricedProduct.price.amount
        }
        return price
    })

    return { featuredImage, currentPrice }
}