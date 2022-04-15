import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
  | {
      type: "Cart - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | {
      type: "Cart - Add Product";
      payload: ICartProduct[];
    }
  | {
      type: "Cart - Change cart quantity";
      payload: ICartProduct;
    }
  | {
      type: "Cart - Remove Product in cart";
      payload: ICartProduct;
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - LoadCart from cookies | storage":
      return {
        ...state,
        cart: action.payload,
      };
    case "Cart - Add Product":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "Cart - Change cart quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          product.quantity = action.payload.quantity;
          return action.payload;
        }),
      };
    case "Cart - Remove Product in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(product._id === action.payload._id &&
            product.size === action.payload.size)
        ),
      };

    default:
      return state;
  }
};
