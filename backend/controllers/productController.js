import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler (async (req, res) => {
    //how many per page
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    
    const keyword = req.query.keyword 
    ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
    res.json({products, page, pages: Math.ceil(count / pageSize)})
})

//@desc Fetch single product
//@route GET /api/product
//@access Public
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

//@desc     Delete product by id
//@route    DELETE /api/product/:id
//@access   Private/Admin
const deleteProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    
    if(product){
        await product.remove()
        console.log('Removing...')
        res.json({
            message: 'Product Removed'
        })
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

//@desc     Create product 
//@route    POST /api/products
//@access   Private/Admin
const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//@desc     Update a product 
//@route    PUT /api/products/:id
//@access   Private/Admin
const updateProduct = asyncHandler(async(req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body
    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

    }else{
        res.status(404)
        throw new Error('Product not found')
    }

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
})

//@desc     Create new review 
//@route    POST /api/products/:id/review
//@access   Private
const createProductReview = asyncHandler(async(req, res) => {
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)
    
    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: rating,
            comment,
            user: req.user._id
        }
        
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc,item) => {
            return item.rating + acc
        }, 0) / product.reviews.length ; 

        await product.save()
        res.status(201).json({
            message: 'Review added'
        })

    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc     Get top rated products 
//@route    GET /api/products/top
//@access   Public
const getTopProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)
    res.json(products)
})

export {getProductById, getProducts, deleteProductById, updateProduct, createProduct, createProductReview, getTopProducts}