import mongoose from "mongoose"

const AuctionSchema = new mongoose.Schema({
   name: {
      type: String,
      unique: true,
   },
   image: {
      type: String,
   },
   desc: {
      type: String,
   },
   category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
   },
   artist: {
      type: mongoose.Types.ObjectId,
      ref: "User",
   },
   price: {
      type: String,
   },
   winner: {
      type: String,
      default: "none",
   },
   sold: {
      default: false,
      type: Boolean,
   },
})

const Auction = mongoose.model("Auction", AuctionSchema)

export default Auction
