import express from 'express'
const router = express.Router()
import {deleteProductById, getProductById, getProducts, updateProduct, createProduct, createProductReview} from '../controllers/productController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

router.route('/')
    .get(getProducts)
    .post(protect, isAdmin, createProduct)

router.route('/:id/reviews').post(protect, createProductReview)

router.route('/:id')
    .get(getProductById)
    .delete(protect, isAdmin, deleteProductById)
    .put(protect, isAdmin, updateProduct)

export default router;