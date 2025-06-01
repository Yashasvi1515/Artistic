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
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
//const { type } = require('os');
import session from "express-session";
import "./auth/googleOauth.js"; 
import Product from "./Models/Product.js";


app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3000", // your React app URL
  credentials: true,               // allow cookies to be sent
}));

connectDB();

// Root route
app.get('/', (req, res) => {
    res.send('Express app is running');
});

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

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send("Email is required.");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use 'hotmail', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Kalakriti Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Subscribing!",
      html: `<h2>Welcome to Kalakriti!</h2><p>Thanks for subscribing. Stay tuned for amazing updates!</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Email failed.");
  }
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

//Creating Endpoint for registering the user
app.post('/signup',async (req,res)=>{
  let check=await User.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success:false,errors:"Existing user found with same emailID"})
  }
  let cart={};
  for (let i = 0; i < 300; i++) {
    cart[i]=0;
  }

    const {name,email,password}=req.body;
    const user=new User({
        name:name,
        email:email,
        password:password,
        cartData:cart,
    });
    await user.save();
    const data={
      user:{
        id:user.id
      }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
});

// creting endpoint for user login
app.post('/login',async(req,res)=>{
let user=await User.findOne({email:req.body.email});
if(user){
  const passCompare=req.body.password===user.password;
  if(passCompare){
    const data={
      user:{
        id:user.id
      }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
  }else{
    res.json({sucess:false,errors:"wrong Password"});
  }
}
else{
  res.json({sucess:false,errors:"Wrong email id"});
}
})

//creating endpoint for new collection
app.get('/newcollection',async(req,res)=>{
let products=await Product.find({});
let newcollection= products.slice(1).slice(-8);
console.log("new collection fetched");
res.send(newcollection);
})

// Endpoint to get new collection in 'acrylic' category
app.get('/newcollection/:category', async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
  const products = await Product.find({ category });
  res.send(products.slice(-8));
  } catch (err) {
    console.error("Error fetching acrylic new collection:", err);
    res.status(500).send("Server error");
  }
});


//creating endpoint for popular 
app.get('/popular',async(req,res)=>{
let products=await Product.find({category:"acrylic"});
let popular= products.slice(0,4);
console.log("Popular fetched");
res.send(popular);
})

//creating middleware to fetch user
const fetchUser= async(req,res,next)=>{
  const token=req.header('auth-token');
  if(!token){
    res.status(401).send({errors:"Please authenticate using valid token"})
  }else{
    try {
      const data=jwt.verify(token,'secret_ecom');
      req.user=data.user;
      next();
    } catch (error) {
      res.status(401).send({errors:"please authenticate using a valid token "})
    }
  }
}

//creating endpoint for cartproducts 
app.post('/addtocart',fetchUser,async(req,res)=>{
  console.log("Added",req.body.itemId);
 let userData=await User.findOne({_id:req.user.id});
 userData.cartData[req.body.itemId]+=1;
 await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
 res.send("Added");
})
//creating endpoint for removing cartproducts 
app.post('/removefromcart',fetchUser,async(req,res)=>{
 console.log("removed",req.body.itemId);
  let userData=await User.findOne({_id:req.user.id});
 if( userData.cartData[req.body.itemId]>0)
 userData.cartData[req.body.itemId]-=1;
 await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
 res.send("Removed");
})

//creating endpoint to get cart data
app.post('/getcart',fetchUser,async(req,res)=>{
  console.log("getcart");
  let userData=await User.findOne({_id:req.user.id});
  res.json(userData.cartData);
})

//Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
