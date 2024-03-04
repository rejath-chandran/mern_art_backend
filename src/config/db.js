import mongoose from "mongoose"
import Auction from "../model/auction.js"
import { connected_socket, notify_que } from "./Que.js"
import SoldAuction from "../model/sold_auction.js"
import { SocketInit, IO as io } from "../socket.js"
import moment from "moment"
import Bid from "../model/bid.js"
import user from "../model/user.js"
const ConnectToDB = async () => {
   try {
      let con = await mongoose.connect(process.env.DB_URL)
      console.log(`mongodb connected:${con.connection.host}`)

      const changestream = mongoose.connection.collection("auctions").watch()
      const changestream_product = mongoose.connection.collection("products").watch()

      changestream.on("change", async (change) => {
         console.log(change)
         if (change.operationType === "delete") {
            let allbids=await Bid.find({item:change.documentKey._id}).sort({amount:-1})
          if(allbids.length>0){
            let winner_id=allbids[0].bidder
            let winner_amount=allbids[0].amount
            for(let bid of allbids){
               // await user.findByIdAndUpdate(bid.bidder,{balance:bid.amount})
              let update_user= await user.findOne({_id:bid.bidder})
              update_user.balance=parseInt(update_user.balance)+parseInt(bid.user_amount)
              await update_user.save()
            }
            // console.log()

            let newuser=await user.findOne({_id:winner_id})
            newuser.balance=parseInt(newuser.balance)-parseInt(winner_amount)
            await newuser.save()
            await SoldAuction.findOneAndUpdate({aid:change.documentKey._id},{
               sold:true,
               price:winner_amount,
               winner:newuser.email
            })
          }

            notify_que.push({
               id: 1,
               message: `auction deleted ${change.documentKey._id}`,
               date: moment().format("MMMM Do YYYY, h:mm:ss a"),
            })

            for (let id of connected_socket) {
               io.to(id).emit("notify", notify_que.reverse())
            }
         }
         if (change.operationType === "insert") {
            notify_que.push({
               id: 1,
               message: `auction added ${change.fullDocument.name}`,
               date: moment().format("MMMM Do YYYY, h:mm:ss a"),
            })

            for (let id of connected_socket) {
               io.to(id).emit("notify", notify_que.reverse())
            }
         }
      })

      changestream_product.on("change", async (change) => {
         console.log(change)
         if (change.operationType === "insert") {
            notify_que.push({
               id: change.fullDocument._id,
               message: `New Art added checkout ${change.fullDocument.name}`,
               date: moment().format("MMMM Do YYYY, h:mm:ss a"),
            })

            for (let id of connected_socket) {
               io.to(id).emit("notify", notify_que.reverse())
            }
         }
      })

      return con
   } catch (err) {
      console.log("DB ERROR:", err)
      process.exit(1)
   }
}

export default ConnectToDB
