import express from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import Order from "../models/orderModel.js";
import Product from '../models/productModel.js';
import Razorpay from "razorpay";
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
    key_id: `${process.env.RAZORPAY_TEST_KEY}`,
    key_secret: `${process.env.RAZORPAY_TEST_SECRET}`
})

//@desc Create new order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async(req,res)=>{
    const { orderItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, paymentMethod, totalPrice} = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error ('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x)=>({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const newOrder = await order.save();

        res.status(201).json(newOrder);
    }
})

//@desc Get logged in users orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders)
})

//@desc Get a particular order
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error ('Order not found!')
    }
})

//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async(req,res)=>{
    
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const payload = `${razorpayOrderId}|${razorpayPaymentId}`;

    try {
        const expect = crypto.createHmac('sha256',`${process.env.RAZORPAY_TEST_SECRET}`).update(payload).digest('hex');

        const isValidSignature = expect === razorpaySignature;

        if(isValidSignature) {
            const order = await Order.findById(req.params.id)
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                // Save Razorpay payment details if necessary
                order.paymentDetails = {
                    orderId: razorpayOrderId,
                    paymentId: razorpayPaymentId,
                    signature: razorpaySignature
                };
        
                const updatedOrder = await order.save();
                res.status(200).json(updatedOrder)
            } else {
                res.status(404);
                throw new Error('Order not found')
            }
        } else {
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error verifying signature:', error);
        res.status(500);
        throw new Error('Internal server error');
    }
})

//@desc Update order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private/admin
const updateOrderToDelivered = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found!')
    }
})

//@desc Get all orders
//@route GET /api/orders
//@access Private/admin
const getAllOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find({}).populate('user', 'id name')
    res.status(200).json(orders); 
})


export {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders}