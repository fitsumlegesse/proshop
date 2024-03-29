import asyncHandler from 'express-async-handler'
import Order from '../model/orderModel.js'

//@DEs Create new order 
//@route  POST /api/products
//@access  Private

const addOrderItems = asyncHandler(async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
        return
    }else{
        const order = new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,

        })

        const createdOrder = await order.save()
        res.status(201).json({createdOrder})
    }
})

//@DEs GET order by ID 
//@route  GET /api/orders/:ID
//@access  Private

const getOrderById = asyncHandler(async(req,res)=>{
    
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
        // console.log(order);
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

export  {
    addOrderItems,
    getOrderById
}