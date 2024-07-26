import ReviewModel, { IReview } from "../models/ReviewModel";



interface ReviewData {
  user: string;
  product: string;
  rating: number;
  comment: string;
}

export const createReview = async (reviewData: ReviewData): Promise<IReview> => {
  const review = new ReviewModel(reviewData);
  await review.save();
  return review;
};

export const getReviewsByProduct = async (productId: string): Promise<IReview[]> => {
  return ReviewModel.find({ product: productId }).populate('user', 'firstName lastName');
};

export const getReviewById = async (reviewId: string): Promise<IReview | null> => {
  return ReviewModel.findById(reviewId).populate('user', 'firstName lastName');
};

export const updateReview = async (reviewId: string, reviewData: Partial<ReviewData>): Promise<IReview | null> => {
  return ReviewModel.findByIdAndUpdate(reviewId, reviewData, { new: true }).populate('user', 'firstName lastName');
};

export const deleteReview = async (reviewId: string): Promise<IReview | null> => {
  return ReviewModel.findByIdAndDelete(reviewId);
};
