import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


const ProductSchema = new Schema({
    id:{
        type:Number,
        required:true   
    },
    name:{
        type:String,
        required:true
    },image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default:true
    },
     reviews: [reviewSchema]
})

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
