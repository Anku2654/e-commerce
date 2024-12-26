import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectCart = (state: AppState) => state.cart;

export const selectCartCount = createSelector(
  selectCart,
  (cart) => cart.count
);
