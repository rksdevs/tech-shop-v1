import express from "express";
import {protect, admin} from "../middlewares/authMiddleware.js";
import {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders} from "../controller/orderController.js"

const router = express.Router();

//createNewOrder
router.post('/', protect, addOrderItems);

//get logged in users orders
router.get('/myorders', protect, getMyOrders);

//get a particular order
router.get('/:id', protect, getOrderById); //does this need admin access 

//update order to paid
router.put('/:id/pay', protect, updateOrderToPaid);

//update order to delivered
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

//get all orders
router.get('/', protect, admin, getAllOrders);

export default router;

