import express from 'express';
const router = express.Router();
import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';
import { getAllProducts, getProductById } from '../controller/productController.js';

router.get("/", getAllProducts)

router.get("/:id", getProductById)

export default router;