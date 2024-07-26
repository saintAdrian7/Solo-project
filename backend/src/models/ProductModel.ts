import mongoose, { Schema, Document } from "mongoose";
import { Product } from "../Interfaces/Product";

export interface IProduct extends Product, Document {}

const ProductSchema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Seller: {
            type: Schema.Types.ObjectId,
            ref: 'NovaMartUser'
        },
        Description: {
            type: String,
            required: true
        },
        DiscountedPrice: {
            type: Number,
            required: true
        },
        CashPrice: {
            type: Number
        },
        Image: {
            type: [String],
        },
        Category: {
            type: String,
            required: true,
            enum: [
                'Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Beauty', 'Toys', 'Groceries', 'Automotive', 'Health'
            ]
        },
        ratings: {
            type: Number,
        },
        reviews: {
            type: [Schema.Types.ObjectId],
            ref: 'Review'
        },
    },
    {
        timestamps: true 
    }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
