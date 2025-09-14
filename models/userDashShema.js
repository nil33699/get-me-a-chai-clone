import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String },
    profilePicture: { type: String },
    coverPicture: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    razorpayID: { type: String },
    razorpaySecret: { type: String }, 

})

export const User = mongoose.models.User || mongoose.model("User", UserSchema);