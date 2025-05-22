import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
