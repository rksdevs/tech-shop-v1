import express from 'express';
const router = express.Router();
import { getAllProducts, getProductById, createProduct } from '../controller/productController.js';
import {admin, protect} from '../middlewares/authMiddleware.js';

router.get("/", getAllProducts)

router.get("/:id", getProductById)

router.post('/', protect, admin, createProduct)

export default router;