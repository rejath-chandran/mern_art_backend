import user from "../model/user.js"
import Jwt from "jsonwebtoken"
export const UserLogin = async (req, res, next) => {
   try {
      const { email, password, type = "customer" } = req.body
      let newuser

      if (type === "customer") {
         newuser = await user.findOne({ email: email })
      } else if (type === "seller") {
         newuser = await user.findOne({ email: email, role: "seller" })
      } else {
         newuser = await user.findOne({ email: email, role: "admin" })
      }
      if (!newuser) {
         throw new Error("no user found")
      }
      const isValid = await newuser.verify(password)
      if (isValid) {
         console.log(process.env.JWT_SECRET)
         const Token = Jwt.sign(
            { userId: newuser._id },
            process.env.JWT_SECRET,
            {
               expiresIn: "24h",
            },
         )
         return res.status(200).json({ status: true, type, Token })
      }
      res.status(401).json({ status: false })
   } catch (error) {
      console.log(error)
      next(error)
   }
}

export const UserRegister = async (req, res, next) => {
   try {
      const { name, email, password } = req.body
      await user.create({
         name,
         email,
         password,
      })
      res.status(201).json({ status: true })
   } catch (error) {
      next(error)
   }
}

export const MakeUserseller = async (req, res, next) => {
   try {
      const UserId = req.auth.userId
      await user.findByIdAndUpdate(UserId, { role: "seller" })
      return res.status(200).json({ status: true })
   } catch (err) {
      next(err)
   }
}
