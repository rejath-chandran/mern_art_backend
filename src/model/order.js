import Razorpay from "razorpay"
import { v4 as uuidv4 } from 'uuid';

const razorpay=new Razorpay({
    key_id: "rzp_test_1Ez7RpNLZ42xoT",
    key_secret: "fLLWfBaL1DcuH9CDkxwEPcIT",
})

export const Payment=async(req,res,next)=>{
    const {amount}=req.body
    const options = {
        amount:amount,
        currency:"INR",
        receipt: uuidv4(),
        payment_capture: 1
    };

    try{
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    }catch(error){
        console.log(error)
        next(error)
    }
}

export const VerifyPayment=async(req,res,next)=>{
    try{
        const response=await razorpay.orders.fetch("order_NQaCIM0cVIq9P4")
        
        if(response.status==="paid") return res.status(200).send("sucess")

        res.status(400).send("failed")
    
    }catch(error){
        console.log(error)
        next(next)
    }
}