import mongoose from "mongoose"
import Auction from "../model/auction.js"
import { connected_socket, notify_que } from "./Que.js"

import { SocketInit, IO as io } from "../socket.js"
import moment from "moment"
const ConnectToDB = async () => {
   try {
      let con = await mongoose.connect(process.env.DB_URL)
      console.log(`mongodb connected:${con.connection.host}`)

      const changestream = mongoose.connection.collection("auctions").watch()

      changestream.on("change", async (change) => {
         console.log(change)
         if (change.operationType === "delete") {
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

      return con
   } catch (err) {
      console.log("DB ERROR:", err)
      process.exit(1)
   }
}

export default ConnectToDB
