import {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../actions/cartActions";
import { db } from "../data/db";
import { Guitar, CartItem } from "../types";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "remove-from-cart"; payload: { id: Guitar["id"] } }
  | { type: "decrease-quantity"; payload: { id: Guitar["id"] } }
  | { type: "increase-quantity"; payload: { id: Guitar["id"] } }
  | { type: "clear-cart" };

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  switch (action.type) {
    case "add-to-cart":
      return addToCart(state, action.payload.item);

    case "remove-from-cart":
      return removeFromCart(state, action.payload.id);

    case "decrease-quantity":
      return decreaseQuantity(state, action.payload.id);

    case "increase-quantity":
      return increaseQuantity(state, action.payload.id);

    case "clear-cart":
      return clearCart(state);

    default:
      return state;
  }
};
