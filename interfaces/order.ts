import { IUser } from "./";

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult?: string;
  numberOfitems: number;
  subtotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: string;
  quantity: number;
  slug: string;
  image: string;
  price: number;
}

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
}
