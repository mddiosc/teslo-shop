import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

export interface CartContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfitems: number;
  subtotal: number;
  taxRate: number;
  total: number;
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void
}

export const CartContext = createContext({} as CartContextProps);