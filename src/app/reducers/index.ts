import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import { productReducer } from "./product/product.reducer";
import { sesionReducer } from "./session/session.reducer";
import { ProductToCart } from "../shared/models/product.interface";
import { AppProductsState } from "./product/product.interfaces";


export const reducers: ActionReducerMap<AppProductsState> = {
   products: productReducer
};

export const metaReducers: MetaReducer<AppProductsState>[] = [];