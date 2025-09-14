import { NextResponse } from "next/server";
import { Payment } from "@/models/payment";
import { User } from "@/models/userDashShema";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDb from "@/db/connectDb";

export const POST = async (req)=>{
    await connectDb();
    let body = await req.formData();
    body = Object.fromEntries(body);

    //checking razorpay id is present or not
    let p = await Payment.findOne({oid:body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success:false,message:"order ID not found"})
    }
    
    // fetching user for razorpay id for payment
    let secret = await User.findOne({"username":p.to_user})
    secret = secret.razorpaySecret
    // let secret = "eHbebRidGEuGGsLuCAxDL6YN"
    let xx = validatePaymentVerification({order_id:body.razorpay_order_id , payment_id:body.razorpay_payment_id} , body.razorpay_signature , secret)

    if(xx){
        let updatedPayment = await Payment.findOneAndUpdate({oid:body.razorpay_order_id}, {done:true} , {new:true});
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({ success: false, message: "Payment verification failed" });

    }
}