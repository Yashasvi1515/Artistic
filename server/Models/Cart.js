// Models/Cart.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  userEmail: { type: String, required: true, unique: true },
  items: { type: Map, of: Number, default: {} }, // e.g., { "1": 2, "5": 1 }
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
