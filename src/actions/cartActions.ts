import { CartState } from "../reducers/cart-reducer";
import { Guitar } from "../types";

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

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

export function removeFromCart(state: CartState, id: Guitar["id"]): CartState {
  return {
    ...state,
    cart: state.cart.filter((guitar) => guitar.id !== id),
  };
}

export function decreaseQuantity(
  state: CartState,
  id: Guitar["id"]
): CartState {
  const updatedCart = state.cart.map((item) => {
    if (item.id === id && item.quantity > MIN_ITEMS) {
      return {
        ...item,
        quantity: item.quantity - 1,
      };
    }
    return item;
  });

  return {
    ...state,
    cart: updatedCart,
  };
}

export function increaseQuantity(
  state: CartState,
  id: Guitar["id"]
): CartState {
  const updatedCart = state.cart.map((item) => {
    if (item.id === id && item.quantity < MAX_ITEMS) {
      return {
        ...item,
        quantity: item.quantity + 1,
      };
    }
    return item;
  });
  return {
    ...state,
    cart: updatedCart,
  };
}

export function clearCart(state: CartState): CartState {
  return {
    ...state,
    cart: [],
  };
}
