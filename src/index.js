import express from "express"
import dotenv from "dotenv"
import ConnectToDB from "./config/db.js"
import router from "./routes/routes.js"
import cors from "cors"
import bodyParser from "body-parser"
import { createServer } from "http"
import { SocketInit, IO as io } from "./socket.js"
import { Socket } from "socket.io"
import Product from "./model/product.js"
import chalk from "chalk"
import {Add,Remove,notify_que} from './config/Que.js'
import moment from "moment"
dotenv.config()

const PORT = process.env.PORT
const app = express()

let httpserver = new createServer(app)
SocketInit(httpserver)
let connection = await ConnectToDB()

app.use(cors())
app.use(bodyParser.json())
app.use("/api", router)

app.use((err, req, res, next) => {
   res.status(500).json({ message: "something went wrong" })
   next(err)
})

io.on("connection", (client) => {

   console.log("new connection ✅", client.id)
   Add(client.id)

   io.emit("notify", [
      ...notify_que.reverse(),
      // { id: 1, message:"hey", date:moment().format('MMMM Do YYYY, h:mm:ss a') }
   ])

   client.on("disconnect", () => {
      Remove(client.id)
      console.log("close connection  ❌",client.id)
   })

})

httpserver.listen(PORT, () =>
   console.log("server started on :", chalk.blue(PORT)),
)
