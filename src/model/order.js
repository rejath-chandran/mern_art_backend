import mongoose from "mongoose"

const Orderschema = new mongoose.Schema({
   order_id: String,
   name: String,
   email: String,
   phone: String,
   adress: String,
   payment: {
      type: Boolean,
      default: false,
   },
   status: {
      type: String,
      enum: ["placed","processing","shipped","rejected","delivered"],
      default: "placed",
   },
   product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
   },
},{timestamps:true})

const Order = mongoose.model("Order", Orderschema)

export default Order
