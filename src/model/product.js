import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
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
})

const Product = mongoose.model("Product", ProductSchema)
Product.watch().
on('change', data => console.log(data))

export default Product
