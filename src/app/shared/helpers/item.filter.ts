import { ProductToCart } from "../models/product.interface";

export function ProductsFilterDisabled(products: ProductToCart[], item: ProductToCart) {
    let prods = products.some(valor => valor.id === item.id)

    return prods

}