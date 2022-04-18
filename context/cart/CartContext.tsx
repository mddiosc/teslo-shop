import { createContext } from "react";
import { ICartProduct, IShippingAddress } from "../../interfaces";


export interface CartContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfitems: number;
  subtotal: number;
  tax: number;
  total: number;

  shippingAddress?: IShippingAddress

  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (shippingAddress: IShippingAddress) => void
}

export const CartContext = createContext({} as CartContextProps);
