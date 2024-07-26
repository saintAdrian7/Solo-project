import express from 'express';
import { DeleteProduct, GetAllProducts, GetMostPopularProducts, GetProduct, GetProductsByCategory, GetRecentlyAddedProducts, GetUserReccomendations, HandleSearchProducts, PostProduct, UpdateProduct } from '../Controller/Product';
const router = express.Router();


router.post('/', PostProduct)
router.get('/', GetAllProducts)
router.get('/recommendations/:userId', GetUserReccomendations)
router.get('/product/:id',GetProduct)
router.get('/category/:category', GetProductsByCategory)
router.get('/popular', GetMostPopularProducts)
router.get('/recent', GetRecentlyAddedProducts)
router.get('/search', HandleSearchProducts)
router.patch('/:id', UpdateProduct)
router.delete('/:id', DeleteProduct)
export default router;
