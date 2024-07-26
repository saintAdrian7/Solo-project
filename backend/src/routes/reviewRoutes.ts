import express from 'express';
import { createReview, getReviewById, getReviewsByProduct, updateReview, deleteReview} from '../Controller/Review';



const router = express.Router();

router.post('/:productId/', createReview);
router.get('/:productId/', getReviewsByProduct);
router.get('/review/:reviewId', getReviewById);
router.patch('/review/:reviewId',  updateReview);
router.delete('/review/:reviewId',  deleteReview);

export default router;
