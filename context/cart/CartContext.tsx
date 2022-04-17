import { createContext } from "react";
import { ICartProduct } from "../../interfaces";
import { ShippingAddress } from "./";

export interface CartContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfitems: number;
  subtotal: number;
  taxRate: number;
  total: number;

  shippingAddress?: ShippingAddress

  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (shippingAddress: ShippingAddress) => void
}

export const CartContext = createContext({} as CartContextProps);
