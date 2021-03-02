import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './model/userModel.js'
import Product from './model/productModel.js'
import Order from './model/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async ()=>{
    try {
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()

       const createdUser = await User.insertMany(users)

       const adminUser = createdUser[0]._id

       const sampleProducts = products.map(product =>{
           return {... product, user: adminUser}
       })

       await Product.insertMany(sampleProducts)
       console.log('data imorted!'.green.inverse)
       process.exit()

    } catch (error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}