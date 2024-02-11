import express from 'express';
const router = express.Router();
import { getAllProducts, getProductById, createProduct, updateProduct } from '../controller/productController.js';
import {admin, protect} from '../middlewares/authMiddleware.js';

router.get("/", getAllProducts)

router.get("/:id", getProductById)

router.post('/', protect, admin, createProduct)

router.put("/:id", protect, admin, updateProduct);

export default router;