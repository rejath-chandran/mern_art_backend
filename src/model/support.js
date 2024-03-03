import mongoose from "mongoose";

const supportschema=new mongoose.Schema({
    email:{
        type:String
    },
    messsage:{
        type:String,
        default:""
    }
})

const Support=mongoose.model("support",supportschema)

export default Support