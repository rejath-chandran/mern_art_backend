import mongoose from "mongoose"

const systemchema = new mongoose.Schema({

   name: {
      type: String,
   },
   logo: {
      type: String,
   },
   com: {
      type: Number,
   },
   home:{
    type:String,
    default:"welcome"
   },
   about:{
    type: String,
   }

})


const system = mongoose.model("system",systemchema)

export default  system
