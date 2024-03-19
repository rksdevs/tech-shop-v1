import path from 'path';
import express from 'express';
import products from './data/products.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectToDb from './config/db.js';
import productRoute from './routes/productRoute.js';
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from './routes/uploadRoute.js';
import razorPayRoute from './routes/rzpRoute.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

connectToDb(); //Connection to DB
const port = process.env.PORT || 5000;
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRoute)
app.use("/api/users", userRoute)
app.use("/api/orders", orderRoute)
app.use('/api/upload', uploadRoute)
app.use('/api/razorpay', razorPayRoute)

app.get('/api/config/paypal', (req,res)=>res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

const __dirname = path.resolve(); //set __dirname to current directory;
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    //any routes which is not listed in the api will be redirect to index page
    app.get("*", (req,res)=>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get("/", (req, res)=>{
        res.send("API is running...")
    })
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log("Server is running on port: "+ port)
})