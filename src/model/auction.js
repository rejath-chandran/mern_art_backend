import mongoose from "mongoose"

import user from "./user"

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
   artist: {
      type: mongoose.Types.ObjectId,
      ref: "",
   },
   price: {
      type: String,
   },
})

const Product = mongoose.model("Product", ProductSchema)
export default Product
