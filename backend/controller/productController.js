import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getAllProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    if (products) {
        return res.json(products)
    } else {
        res.status(404);
        throw new Error ('Resources not found! Here is a pancakce..')
    }
})

//@desc Fetch one product by ID
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Resource not found! Here is a pancake..")
    }
})

//@desc Create a product
//@route POST /api/products
//@access admin/private
const createProduct = asyncHandler(async(req,res)=>{
    const newProduct = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        brand: 'Sample Brand',
        category: 'Sample Category',
        image: '/image/sample.jpg',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    });

    const createdProduct = await newProduct.save();
    res.status(200).json(createdProduct);
})

export {getAllProducts, getProductById, createProduct}