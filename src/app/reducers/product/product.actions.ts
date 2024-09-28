import { createAction, props } from "@ngrx/store";

import { ProductToCart } from "../../shared/models/product.interface";

export const ADD_PRODUCT= createAction('[PRODUCT] ADD',props<{item: ProductToCart}>())
export const GET_PRODUCTS= createAction('[PRODUCT] GET')
export const DELETE_PRODUCT= createAction('[PRODUCT] DELETE',props<{idx: number}>())
export const RESET= createAction('[PRODUCT] RESET')