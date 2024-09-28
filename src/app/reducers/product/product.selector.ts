import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppStateProductsSelector } from './product.interfaces';




// Get complete state of the products in application
export const selectAppState = createFeatureSelector<AppStateProductsSelector>('products');

// get All favorites products
export const selectProducts = createSelector(
  selectAppState,
  (state: AppStateProductsSelector) => {
    return state['productsCart']

  }
);