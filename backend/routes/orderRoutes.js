import express from 'express'
const router = express.Router()
import { protect, isAdmin } from '../middleware/authMiddleware.js'
import {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders} from '../controllers/orderController.js'

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router