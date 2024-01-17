import mongoose from "mongoose"

const BidSchema = new mongoose.Schema({
   item: {
      type: mongoose.Types.ObjectId,
      ref: "Auction",
   },
   bidder: {
      type: mongoose.Types.ObjectId,
      ref: "User",
   },
   amount: {
      type: Number,
   },
})

const Bid = mongoose.model("Bid", BidSchema)
export default Bid
