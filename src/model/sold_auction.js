import mongoose from "mongoose"

const SoldAuctionSchema = new mongoose.Schema({
   aid: {
      type: mongoose.Types.ObjectId,
      ref: "Auction",
   },
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

const SoldAuction = mongoose.model("SoldAuction", SoldAuctionSchema)
export default SoldAuction
