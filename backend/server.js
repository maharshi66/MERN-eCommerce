//Common-JS uses require vs. import statement
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import morgan from 'morgan'
import connectDB from './config/db.js'
import colors from 'colors'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js' 
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js' 

dotenv.config()
const app =  express();

// Morgan for logging
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

//Required for Body Parsing
app.use(express.json())


connectDB()

app.get('/', (req, res) => {
    res.send('API is Running...!');
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

//Custom Error Handling
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
    PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold))