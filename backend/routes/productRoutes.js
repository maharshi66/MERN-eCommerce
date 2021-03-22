import express from 'express'
const router = express.Router()
import {deleteProductById, getProductById, getProducts, updateProduct, createProduct} from '../controllers/productController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

//@desc Fetch all products
//@route GET /api/products
//@access Public
router.route('/')
    .get(getProducts)
    .post(protect, isAdmin, createProduct)

//@desc Fetch single product
//@route GET /api/product
//@access Public
router.route('/:id')
    .get(getProductById)
    .delete(protect, isAdmin, deleteProductById)
    .put(protect, isAdmin, updateProduct)

export default router;