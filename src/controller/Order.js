import Razorpay from "razorpay"
import { v4 as uuidv4 } from "uuid"
import Order from "../model/order.js"
import User from "../model/user.js"
const razorpay = new Razorpay({
   key_id: "rzp_test_1Ez7RpNLZ42xoT",
   key_secret: "fLLWfBaL1DcuH9CDkxwEPcIT",
})

export const Payment = async (req, res, next) => {
   console.log(req.body)
   const { name, email, phone, adress, cart } = req.body
   const amount = cart.reduce((p, c) => parseInt(c.price) + p, 0)
   const options = {
      amount: 100 * amount,
      currency: "INR",
      receipt: uuidv4(),
      payment_capture: 1,
   }

   try {
      const response = await razorpay.orders.create(options)
      let orders = cart.map((i) => ({
         order_id: response.id,
         name: name,
         email: email,
         phone: phone,
         adress: adress,
         product: i.id,
      }))
      await Order.insertMany(orders)
      res.json({
         order_id: response.id,
         currency: response.currency,
         amount: response.amount,
      })
   } catch (error) {
      console.log(error)
      next(error)
   }
}

export const VerifyPayment = async (req, res, next) => {
   try {
      const { order_id } = req.body
      console.log(order_id)
      const response = await razorpay.orders.fetch(order_id)

      if (response.status === "paid") {
         console.log(order_id)

         const condition = { order_id: order_id }

         const updateFields = { payment: true }

         await Order.updateMany(condition, updateFields)

         return res.status(200).send("sucess")
      }

      res.status(400).send("failed")
   } catch (error) {
      console.log(error)
      next(next)
   }
}

export const MakewalletOrder = async (req, res, next) => {
   try {
      const { amount } = req.params
      console.log(amount)
      const options = {
         amount: parseInt(amount) * 100,
         currency: "INR",
         receipt: uuidv4(),
         payment_capture: 1,
      }
      const response = await razorpay.orders.create(options)
      console.log(response)
      res.status(200).json({
         id: response.id,
         amount: response.amount,
      })
   } catch (error) {
      next(error)
   }
}

export const WalletComplete = async (req, res, next) => {
   try {
      const { amount } = req.body
      console.log("req amount", amount)
      const { userId } = req.auth
      const u = await User.findById(userId)
      let newbalnce = parseInt(u.balance) + parseInt(amount) / 100
      await User.findOneAndUpdate({ _id: userId }, { balance: newbalnce })
      res.status(200).json({ status: true })
   } catch (error) {
      next(error)
   }
}
export const Walletbalance = async (req, res, next) => {
   try {
      const { userId } = req.auth
      const u = await User.findById(userId)

      res.status(200).json({ amount: u.balance })
   } catch (error) {
      next(error)
   }
}
