import mongoose from "mongoose";
import { Product } from "./Product";
import { Order } from "./Order";
export interface User {
    role:"ADMIN" | "USER",
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    image:string,
    products: Product[];
    orders: Order[];
    cart: Product[];
}

export interface JwtPayload {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  }
  