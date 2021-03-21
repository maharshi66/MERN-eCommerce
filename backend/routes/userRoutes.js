import express from 'express'
const router = express.Router()
import {authUser, getUserProfile, getUsers, registerNewUser, updateUserProfile, deleteUser} from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(registerNewUser)
      .get(protect, isAdmin, getUsers)

router.post('/login', authUser)

router.route('/profile')
      .get(protect, getUserProfile)
      .put(protect, updateUserProfile)

router.route('/:id').delete(protect, isAdmin, deleteUser)

export default router 