import mongoose from "mongoose";

const CommentSchema=mongoose.Schema({
    message:{
        type:String
    },
    rating:{
        type:String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    time : { type : Date, default: Date.now }
})

const Comment=mongoose.model("Comment",CommentSchema)

export default Comment