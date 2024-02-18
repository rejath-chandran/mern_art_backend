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
   expireAt: { 
      type: Date,
      default: null
   },
})

AuctionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })
AuctionSchema.methods.setExpiration = function(time) {

   console.log(time)

   let mili=new Date(time)-new Date()
   let expirationDate=Date.now()+mili
   this.expireAt = expirationDate;
};

const Auction = mongoose.model("Auction", AuctionSchema)

export default Auction
