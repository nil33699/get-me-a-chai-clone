"use server";

import connectDb from "@/db/connectDb";
import { Payment } from "@/models/payment";
import { User } from "@/models/userDashShema";
import Razorpay from "razorpay";


export const initiate = async (amount, to_username, paymentForm) => {

    await connectDb();
    const user = await User.findOne({"username":to_username})

    const instance = new Razorpay({
        key_id: user.razorpayID,
        key_secret: user.razorpaySecret
    });

    const options = {
        amount: amount * 100, // Convert to paise
        currency: "INR",
    };

    const x = await instance.orders.create(options);

    await Payment.create({
        oid: x.id,
        amount: amount,
        to_user: to_username,
        name: paymentForm.name,
        message: paymentForm.message
    });

    return x;
};

export const fetchUser = async (username) => {
    await connectDb();

    let user = await User.findOne({ "username":username }).lean(); // Get plain JS object

    if (!user) return null; // If no user is found, return null

    // Convert `_id` to string manually
    return {
        ...user,
        _id: user._id.toString(), // ✅ Fix serialization issue
    };
};


export const fetchPayments = async (username) => {
    await connectDb();

    let payments = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 })
        .limit(10)
        .lean(); // Get plain JS objects

    return payments.map(payment => ({
        ...payment,
        _id: payment._id.toString(), // ✅ Fix `_id` serialization
    }));
};

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = {...data}

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({email: ndata.email},{$set:ndata} )
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
        
    }
    else{
        await User.updateOne({email: ndata.email}, {$set:ndata})
    }
    return data


}

