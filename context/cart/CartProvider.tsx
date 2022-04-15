import { useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addProductToCart = (product: ICartProduct) => {
    const isItemExist = state.cart.find(
      (item) => item._id === product._id && item.size === product.size
    );

    if (isItemExist) {
      const newCart = state.cart.map((item) => {
        if (item._id === product._id && item.size === product.size) {
          return {
            ...item,
            quantity: item.quantity + product.quantity,
          };
        }
        return item;
      });
      dispatch({ type: "Cart - Add Product", payload: newCart });
    } else {
      dispatch({
        type: "Cart - Add Product",
        payload: [...state.cart, product],
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        //Methods
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
