import { useEffect, useReducer } from "react";
import Cookie from "js-cookie";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfitems: number;
  subtotal: number;
  taxRate: number;
  total: number;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfitems: 0,
  subtotal: 0,
  taxRate: 0,
  total: 0,
};

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cart = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [];
      dispatch({
        type: "Cart - LoadCart from cookies | storage",
        payload: cart,
      });
    } catch (error) {
      dispatch({ type: "Cart - LoadCart from cookies | storage", payload: [] });
    }
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfitems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subtotal = state.cart.reduce(
      (prev, current) => current.quantity * current.price + prev,
      0
    );
    const taxRate = subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const total = subtotal + taxRate;

    const orderSummary = {
      numberOfitems,
      subtotal,
      taxRate,
      total,
    };

    dispatch({ type: "Cart - Update order summary", payload: orderSummary });
  }, [state.cart]);

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

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: "Cart - Remove Product in cart", payload: product });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "Cart - Change cart quantity", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        //Methods
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
