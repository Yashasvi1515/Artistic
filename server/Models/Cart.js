import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
