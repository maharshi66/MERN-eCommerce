//Common-JS uses require vs. import statement
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js' 
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
const app =  express();

//Required for Body Parsing
app.use(express.json())

connectDB()

app.get('/', (req, res) => {
    res.send('API is Running...!');
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

//Custom Error Handling
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
    PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold))