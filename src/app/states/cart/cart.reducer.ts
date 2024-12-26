import { createReducer, on } from "@ngrx/store";
import { increment, decrement, reset } from "./cart.action"

export interface CartState {
  count: number;
}

export const initialCartState: CartState = {
  count: 0,
};

export const cartReducer = createReducer(
  initialCartState,
  on(increment, (state) => ({ ...state, count: state.count + 1 })), 
  on(decrement, (state) => ({ ...state, count: state.count - 1 })),
  on(reset, (state) => ({ ...state, count: 0 }))
);
