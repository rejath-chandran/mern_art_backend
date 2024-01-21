import mongoose from "mongoose"

const Orderschema = new mongoose.Schema({
   order_id: String,
   name: String,
   email: String,
   phone: String,
   adress: String,
   payment:{
      type:Boolean,
      default:false
   },
   status: {
      type: String,
      enum: ["process", "accepted", "delivered", "rejected"],
      default: "process",
   },
   product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
   },
})

const Order = mongoose.model("Order", Orderschema)

export default Order
