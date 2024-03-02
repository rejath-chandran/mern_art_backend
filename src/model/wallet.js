import mongoose from "mongoose"

const walletschema = mongoose.Schema({
   user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
   },
   withdraw: {
      type: String,
   },
   amount: {
      type: String,
   },
   comm: {
      type: String,
   },
   upi: {
      type: String,
   },
   status: {
      type: String,
      default: "processing",
   },
})

const wallet = mongoose.model("wallet", walletschema)

export default wallet
