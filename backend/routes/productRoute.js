import express from 'express';
const router = express.Router();
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory } from '../controller/productController.js';
import {admin, protect} from '../middlewares/authMiddleware.js';

router.get("/", getAllProducts)

router.get("/:id", getProductById)

router.get("/category/:category", getProductsByCategory)

router.post('/', protect, admin, createProduct)

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

export default router;