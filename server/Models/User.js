import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:String
    },
     email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    cartData:{
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
