import { Request, Response } from 'express';
import * as reviewService from '../Services/Review';
import ProductModel from '../models/ProductModel';


export const createReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment, userId } = req.body;
    const { productId } = req.params;

    const review = await reviewService.createReview({
      user: userId,
      product: productId,
      rating,
      comment
    });

    await ProductModel.findByIdAndUpdate(productId, { $push: { reviews: review._id } });

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err:any) {
    res.status(500).json({ message: 'Failed to add review', error: err.message });
  }
};

export const getReviewsByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewService.getReviewsByProduct(productId);
    res.status(200).json(reviews);
  } catch (err:any) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const review = await reviewService.getReviewById(reviewId);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (err:any) {
    res.status(500).json({ message: 'Failed to fetch review', error: err.message });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const reviewData = req.body;

    const review = await reviewService.updateReview(reviewId, reviewData);
    if (review) {
      res.status(200).json({ message: 'Review updated successfully', review });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (err:any) {
    res.status(500).json({ message: 'Failed to update review', error: err.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewService.deleteReview(reviewId);
    if (review) {
      res.status(200).json({ message: 'Review deleted successfully', review });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (err:any) {
    res.status(500).json({ message: 'Failed to delete review', error: err.message });
  }
};
