import express from 'express'
const router = express.Router()
import {authUser, getUserProfile, registerNewUser, updateUserProfile} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerNewUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router 