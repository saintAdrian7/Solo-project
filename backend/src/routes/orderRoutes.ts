import express from 'express';
import { createOrderController, getUserOrderController, updateOrderController, deleteOrderController, getOrdersController } from '../Controller/Order'

const router = express.Router();

router.post('/', createOrderController);
router.get('/', getOrdersController)
router.get('/:userId', getUserOrderController);
router.patch('/:orderId', updateOrderController);
router.delete('/:orderId', deleteOrderController);

export default router;