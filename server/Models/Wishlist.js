import mongoose from "mongoose";
const { Schema } = mongoose;

const wishlistSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);