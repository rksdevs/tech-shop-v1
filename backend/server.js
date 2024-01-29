import express from 'express';
import products from './data/products.js'
import dotenv from 'dotenv';
dotenv.config();
import connectToDb from './config/db.js';
import productRoute from './routes/productRoute.js';
import userRoute from "./routes/userRoute.js";
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

connectToDb(); //Connection to DB
const port = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res)=>{
    res.send("API is running...")
})

app.use("/api/products", productRoute)
app.use("/api/users", userRoute)

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log("Server is running on port: "+ port)
})