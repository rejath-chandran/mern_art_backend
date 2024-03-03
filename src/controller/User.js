import system from "../model/sytem.js"
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
               expiresIn: "720h",
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

export const SellerInfo = async (req, res, next) => {
   try {
      const { id } = req.params
      const Seller = await user.findById(id)
      res.json(Seller)
   } catch (error) {
      next(error)
   }
}

export const SetSystem = async (req, res, next) => {
   try {
      const { name, logo, com, about, home } = req.body
      let data
      if (logo == "") {
         data = { name, com, about, home }
      } else {
         data = { name, logo, com, about, home }
      }
      await system.findOneAndUpdate({}, { $set: data }, { new: true })
      res.status(200).json({ status: true })
   } catch (error) {
      next(error)
   }
}
export const GetSystem = async (req, res, next) => {
   try {
      let data = await system.findOne({})
      res.status(200).json(data)
   } catch (error) {
      next(error)
   }
}

export const GetAllUsersinApp = async (req, res, next) => {
   try {
      let data = await user.find({}).sort({ _id: -1 })
      res.status(200).json(data)
   } catch (error) {
      next(error)
   }
}
