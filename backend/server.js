import express from 'express'
import dotenv from 'dotenv';
import colors from 'colors'
import connectDB from './config/db.js'
// import products from  './data/products.js';
import productRoutes from './routes/productRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'


dotenv.config()
connectDB()
const app = express()


app.get('/', (req,res)=>{

    res.send('App is running...')
})

app.use('/api/products', productRoutes)



app.get('/api/products', (req,res)=>{

    res.json(products);
})

app.use(notFound)
app.use(errorHandler)


app.get('/api/products/:id', (req,res)=>{

    const product = products.find((p) => p._id === req.params.id)

    res.json(product);
})

const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
    )