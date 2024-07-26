import { Product } from "./Product";

export interface Order  {
    user: string
    products: {
      product:Product
      quantity: number;
    }[];
    totalAmount: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  }