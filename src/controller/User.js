import user from "../model/user.js"
import Jwt from "jsonwebtoken"
export const UserLogin = async (req, res) => {
   try {
      const { email, password } = req.body

      const newuser = await user.findOne({ email: email })
      const isValid = await newuser.verify(password)
      if (isValid) {
         const Token = Jwt.sign(
            { userId: newuser._id },
            process.env.JWT_SECRET,
            {
               expiresIn: "24h",
            },
         )
         return res.status(200).json({ status: true, Token })
      }
      res.status(401).json({ status: false })
   } catch (error) {}
}

export const UserRegister = async (req, res) => {
   try {
      const { name, email, password } = req.body
      await user.create({
         name,
         email,
         password,
      })
      res.status(201).json({ status: true })
   } catch (error) {
      console.log(error)
   }
}
