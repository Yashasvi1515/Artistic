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
import session from "express-session";
import "./auth/googleOauth.js"; 
import Product from "./Models/Product.js";
import Wishlist from "./Models/Wishlist.js";


app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,               
}));

connectDB();


app.get('/', (req, res) => {
    res.send('Express app is running');
});


app.get("/profile", (req, res) => {
  if (!req.user) return res.status(401).send("Not logged in");
  res.json({ email: req.user.email }); 
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
      service: "gmail", 
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


app.post('/removeproduct',async (req,res)=>{
 await Product.findOneAndDelete({id:req.body.id});
    console.log("Product deleted successfully");
    res.json({success:true,name:req.body.name});
}
);

app.get('/allproducts',async (req,res)=>{
  let products=await Product.find({});
  console.log("All products fetched successfully");
    res.json(products);
});


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
   res.json({ success: true, token, userId: user._id });
});


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
   res.json({ success: true, token, userId: user._id });
  }else{
    res.json({sucess:false,errors:"wrong Password"});
  }
}
else{
  res.json({sucess:false,errors:"Wrong email id"});
}
})


app.get('/newcollection',async(req,res)=>{
let products=await Product.find({});
let newcollection= products.slice(1).slice(-8);
console.log("new collection fetched");
res.send(newcollection);
})


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



app.get('/popular',async(req,res)=>{
let products=await Product.find({category:"acrylic"});
let popular= products.slice(0,4);
console.log("Popular fetched");
res.send(popular);
})


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


app.post('/addtocart',fetchUser,async(req,res)=>{
  console.log("Added",req.body.itemId);
 let userData=await User.findOne({_id:req.user.id});
 userData.cartData[req.body.itemId]+=1;
 await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
 res.send("Added");
})


app.post('/removefromcart',fetchUser,async(req,res)=>{
 console.log("removed",req.body.itemId);
  let userData=await User.findOne({_id:req.user.id});
 if( userData.cartData[req.body.itemId]>0)
 userData.cartData[req.body.itemId]-=1;
 await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
 res.send("Removed");
})


app.post('/getcart',fetchUser,async(req,res)=>{
  console.log("getcart");
  let userData=await User.findOne({_id:req.user.id});
  res.json(userData.cartData);
})

app.post('/wishlist/add', async (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) {
    return res.status(400).json({ error: 'userId and productId are required' });
  }
  try {
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        items: [productId]
      });
    } else {
      if (wishlist.items.includes(productId)) {
        return res.status(409).json({ message: 'Product already in wishlist' });
      }
      wishlist.items.push(productId);
    }
    await wishlist.save();
    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/wishlist/remove', async (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) {
    return res.status(400).json({ error: 'userId and productId are required' });
  }
  try {
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found for user' });
    }
    const index = wishlist.items.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }
    wishlist.items.splice(index, 1);
    await wishlist.save();
    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (err) {
    console.error('Error removing from wishlist:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/wishlist/get', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate('items');

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found for user' });
    }

    res.status(200).json({ wishlist });
  } catch (err) {
    console.error('Error fetching wishlist:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/products/search', async (req, res) => {
  const { query } = req.query;

  try {
    const products = await Product.find({
      name: { $regex: query, $options: 'i' },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.get('/products/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) }).select('reviews');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product.reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/products/:id/reviews', fetchUser, async (req, res) => {
  const { rating, comment } = req.body;
  const productId = Number(req.params.id); 

  if (!rating || !comment) {
    return res.status(400).json({ error: 'Rating and comment are required' });
  }

  try {
    
    const product = await Product.findOne({ id: productId });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ error: 'Invalid user' });

    const alreadyReviewed = product.reviews.find(
      (rev) => rev.userId.toString() === req.user.id
    );
    if (alreadyReviewed) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }
    const newReview = {
      userId: req.user.id,
      username: user.name ,
      rating,
      comment,
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(201).json({ message: 'Review added successfully' });
  } catch (err) {
    console.error('🚨 Server error while adding review:', err);
    res.status(500).json({ error: 'Server error while adding review' });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
