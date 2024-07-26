import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./UserModel";


export interface IReview extends Document {
  user: IUser['_id'];
  product: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'NovaMartUser',
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true 
  }
);

export default mongoose.model<IReview>('Review', ReviewSchema);
