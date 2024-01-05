import mongoose  from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum : ['user','admin','seller'],
        default: 'user'
    }
})

const user=mongoose.model("User",UserSchema)

export default user