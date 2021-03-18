import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

//@desc Auth user and get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email: email})

    if(user && (await user.matchPassword(password))){ 
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } 
    else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//@desc     Register new user
//@route    POST /api/users
//@access   Public
const registerNewUser = asyncHandler (async (req, res) => {
    const {name, email, password } = req.body
    const userExists = await User.findOne({email: email})

    if(userExists){ 
        res.status(400)
        throw new Error('User already exists')
    } 
    
    const user = await User.create({
        name, 
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler (async (req, res) => {
    
    //Requires protect middleware
    const user = await User.findById(req.user._id)
    if(user){ 
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } 
    else{
        res.status(401)
        throw new Error('User Not Found')
    }
})

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler (async (req, res) => {
    
    //Requires protect middleware
    const user = await User.findById(req.user._id)
    if(user){ 
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } 
    else{
        res.status(401)
        throw new Error('User Not Found')
    }
})

export {authUser, registerNewUser, getUserProfile, updateUserProfile}