const port = 4000;
import express from 'express';
import connectDB from './db.js';
const app = express();
import mongoose from 'mongoose';
import User from './Models/User.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
//const { type } = require('os');
import session from "express-session";
import passport from "passport";
import authRoutes from "./Routes/user.js";
import "./auth/googleOauth.js"; 
import cartRoutes from "./Routes/cart.js";
import Cart from "./Models/Cart.js";
import Product from "./Models/Product.js";


app.use(express.json());

app.use(cors({
  origin: "http://localhost:3001", // your React app URL
  credentials: true,               // allow cookies to be sent
}));

connectDB();

// Root route
app.get('/', (req, res) => {
    res.send('Express app is running');
});

//await User.create({ password: "Test entry",email:"yashu@gmail.com" });

app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,   // true if you use HTTPS in production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);

// Sample protected route
app.get("/profile", (req, res) => {
  if (!req.user) return res.status(401).send("Not logged in");
  res.json({ email: req.user.email }); // return JSON
});


const storage = multer.diskStorage({
    destination:'./upload/images',
    filename: (req, file, cb) => {
       return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload=multer({storage:storage});

app.use('/images',express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({success:1, image_url:`http://localhost:${port}/images/${req.file.filename}`});
});


// For adding a product
app.post("/addproduct",async (req,res)=>{
  let products =await Product.find({});
  let id;
  if(products.length>0){
    let last_product_array=products.slice(-1);
    let last_product=last_product_array[0];
    id=last_product.id+1;
  }
  else{
    id=1;
  }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("Product added successfully");
    res.json({success:true,name:req.body.name});
});

// For deleting a product
app.post('/removeproduct',async (req,res)=>{
 await Product.findOneAndDelete({id:req.body.id});
    console.log("Product deleted successfully");
    res.json({success:true,name:req.body.name});
}
);
// Creating API for get all products
app.get('/allproducts',async (req,res)=>{
  let products=await Product.find({});
  console.log("All products fetched successfully");
    res.json(products);
});
//Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
