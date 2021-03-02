import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import Product from '../model/productModel.js'



//@DEs Fetch all products 
//@route  GET /api/products
//@access  public 

router.get('/', asyncHandler(async(req,res)=>{

    const products = await Product.find({})

    res.json(products);
}) )

//@DEs Fetch single products/:id
//@route  GET /api/products
//@access  public 

router.get('/:id', asyncHandler(async (req,res)=>{

    const product = products.find((p) =>p.id === req.params.id)

    res.json(product)

    
}) )


export default router