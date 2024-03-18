import express from 'express';
const router = express.Router();
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory, updateProductStock, createProductReview, getTopRatedProducts } from '../controller/productController.js';
import {admin, protect} from '../middlewares/authMiddleware.js';

router.get("/", getAllProducts)

router.get("/topProducts", getTopRatedProducts)

router.get("/:id", getProductById)

router.get("/category/:category", getProductsByCategory)

router.post('/', protect, admin, createProduct)

router.put("/:id", protect, admin, updateProduct);

router.post("/updateProductStock", protect, updateProductStock)

router.delete("/:id", protect, admin, deleteProduct);

router.post("/:id/reviews", protect, createProductReview);



export default router;