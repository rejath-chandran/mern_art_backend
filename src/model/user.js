import mongoose from "mongoose"
import { hash, compare } from "bcrypt"

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
   },
   image:{
      type: String,
      default:""
   },
   email: {
      type: String,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   balance: {
      type: Number,
      default: 0,
   },
   role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
   },
   followers: {
      type: mongoose.Types.ObjectId,
      ref: "User",
   },
   follow_count: {
      type: String,
      get: CountFollowers,
   },
   orders: [
      {
         ref: "Order",
         type: mongoose.Types.ObjectId,
      },
   ],
})

UserSchema.pre("save", async function (next) {
   const HashedPasswrd = await hash(this.password, 10)
   this.password = HashedPasswrd
   next()
})

UserSchema.method("verify", async function (password) {
   const isValid = await compare(password, this.password)
   return isValid
})

function CountFollowers() {}

const user = mongoose.model("User", UserSchema)

export default user
