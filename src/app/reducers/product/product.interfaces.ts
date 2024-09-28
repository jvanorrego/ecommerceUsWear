import { ProductToCart } from "../../shared/models/product.interface";


export interface AppStateProductsSelector { 
    productsCart: ProductToCart[] 
}

export interface AppProductsState {
    products:{
       productsCart: ProductToCart[]
    },
    session?: any
 }
 
 