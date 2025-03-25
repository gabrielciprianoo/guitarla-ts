import { CartState } from "../reducers/cart-reducer";
import { Guitar } from "../types";

const MAX_ITEMS = 5;

export function addToCart(state: CartState, item: Guitar): CartState {
    const itemInCart = state.cart.find((cartItem) => cartItem.id === item.id);
  
    const updatedCart = itemInCart
      ? state.cart.map((cartItem) =>
          cartItem.id === item.id && cartItem.quantity < MAX_ITEMS
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      : [...state.cart, { ...item, quantity: 1 }];
  
    return {
      ...state,
      cart: updatedCart,
    };
  }
  
 

