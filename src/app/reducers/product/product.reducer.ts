import { createReducer, on } from '@ngrx/store';
import { ADD_PRODUCT, DELETE_PRODUCT, RESET } from './product.actions';

import { ProductToCart } from './../../shared/models/product.interface';

const products: ProductToCart[]=[];

export const initialState={
    productsCart: products
};

export const productReducer= createReducer(initialState, 
    on(ADD_PRODUCT, (state, {item})=> {
        return{
        ...state, productsCart: [...state.productsCart, item]
    }} ),
    on(RESET, (state)=> ( {...state, productsCart: []})),
    on(DELETE_PRODUCT, (state, {idx})=> {
        let splicedProducts= state.productsCart.filter((item, idxItem)=>(idxItem!==idx))
        
        console.log(state);
        return{...state, productsCart:  splicedProducts}
    }),
    // on(GET_PRODUCTS, (state)=> {
    //     console.log(state);
    //     return {products: state.products}
    // }),
)