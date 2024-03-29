import Razorpay from "razorpay"
import { v4 as uuidv4 } from "uuid"
import Order from "../model/order.js"
import User from "../model/user.js"
import Product from "../model/product.js"
import user from "../model/user.js"
const razorpay = new Razorpay({
   key_id: "rzp_test_1Ez7RpNLZ42xoT",
   key_secret: "fLLWfBaL1DcuH9CDkxwEPcIT",
})

export const Payment = async (req, res, next) => {
   // console.log("order:", req.body)
   const UserId = req.auth.userId
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
         user_id: UserId,
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
      const UserId = req.auth.userId
      const { order_id } = req.body
      // console.log(order_id)
      const response = await razorpay.orders.fetch(order_id)

      if (response.status === "paid") {
         console.log(order_id)

         const condition = { order_id: order_id }

         const updateFields = { payment: true }

         let b = await Order.updateMany(condition, updateFields)

         const Order_list = await Order.find({
            order_id: order_id,
            payment: true,
         }).select("_id")
         const user = await User.findById(UserId)
         Order_list.forEach((i) => {
            user.orders.push(i._id)
         })
         await user.save()

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

export const UserOrders = async (req, res, next) => {
   try {
      const UserId = req.auth.userId

      let user = await User.findById(UserId)
      let user_orders = []

      for (const i of user.orders.reverse()) {
         let ordr = await Order.findById(i).populate("product")
         if (ordr != null) user_orders.push(ordr)
      }

      console.log(user_orders)
      res.status(200).json(user_orders)
   } catch (error) {
      next(error)
   }
}

export const SellerOrders = async (req, res, next) => {
   try {
      const { id } = req.params
      const UserId = req.auth.userId
      const SellerPids = []
      let sellerPrdcts = await Product.find({ artist: UserId }, "_id")

      for (const i of sellerPrdcts) {
         SellerPids.push(i._id)
      }

      let SellerOrders = await Order.find({
         product: {
            $in: SellerPids,
         },
         status: {
            $eq: id,
         },
      }).populate("product")
      const formatedOrders = []
      for (const item of SellerOrders) {
         formatedOrders.push({
            id: item.order_id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            adress: item.adress,
            product: item.product.name,
            status: item.status,
         })
      }

      res.status(200).json(formatedOrders)
   } catch (erro) {
      next(erro)
   }
}

export const ChangeOrderStatus = async (req, res, next) => {
   try {
      const { orderId, status } = req.body
      const UserId = req.auth.userId

      const user_order = await Order.findOne({ order_id: orderId })
      const user_product = await Product.findOne({ _id: user_order.product })

      if (status == "delivered") {
         let usr = await user.findOne({ _id: UserId })
         usr.balance = parseInt(usr.balance) + parseInt(user_product.price)
         await usr.save()
      } else if (status === "rejected") {
         let usr = await user.findOne({ _id: user_order.user_id })
         usr.balance = parseInt(usr.balance) + parseInt(user_product.price)
         await usr.save()
      }

      await Order.updateOne({ order_id: orderId }, { status: status })

      res.status(200).json({
         status: true,
      })
   } catch (error) {
      next(error)
   }
}
