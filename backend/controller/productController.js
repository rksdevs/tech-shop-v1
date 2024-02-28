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
        modelNumber: 'Sample Model Number',
        image: '/images/sample.jpg',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    });

    const createdProduct = await newProduct.save();
    res.status(200).json(createdProduct);
})

//@desc   Update a product
//@route  PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async(req,res)=>{
    const {name, price, brand, category, modelNumber, image, countInStock, description} = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.brand = brand;
        product.category = category;
        product.modelNumber = modelNumber;
        product.image = image;
        product.countInStock = countInStock;
        product.description = description;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Resource not found!')
    }
})

//@desc   Delete a product
//@route  DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({_id: product._id})
        res.status(200).json({message: 'Product deleted successfully'})
    } else {
        res.status(404);
        throw new Error('Resource not found!')
    }
})

//@desc Fetch all products by category
//@route GET /api/products/:category
//@access Public
const getProductsByCategory = asyncHandler(async(req,res)=>{
    const categoryToSearch = req.params.category;
    const product = await Product.find({category: categoryToSearch})
    if(product.length > 0) {
        res.status(200).json(product);
    } else {
        res.status(404);
        throw new Error("Category not found! Here is a pancake..")
    }
})

//@desc   Update a product
//@route  POST /api/products/updateProductStock
//@access Private
const updateProductStock = asyncHandler(async(req,res)=>{
    const order = req.body;
    for (const orderItem of order.orderItems) {
        const product = await Product.findById(orderItem.product);
        if (product) {
            product.countInStock -= orderItem.qty;
            await product.save();
        } else {
            res.status(404);
            throw new Error(`Product with ID ${orderItem.product} not found`);
        }
    }

    res.json({ message: 'Stock updated successfully' });
})

export {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory, updateProductStock}