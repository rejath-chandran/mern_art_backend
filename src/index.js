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
import chalk from 'chalk';
dotenv.config()

const PORT = process.env.PORT
const app = express()

let httpserver = new createServer(app)
SocketInit(httpserver)
let connection=await ConnectToDB()


app.use(cors())
app.use(bodyParser.json())
app.use("/api", router)

app.use((err, req, res, next) => {
   res.status(500).json({ message: "something went wrong" })
   next(err)
})

io.on("connection", (client) => {
   
   console.log("new connection ✅",client.id) 

   client.emit("notify",[{id:1,message:"new dog",date:"friday"}])

   client.on("disconnect",()=>console.log("close connection  ❌"))

})





httpserver.listen(PORT, () => console.log("server started on :",chalk.blue(PORT) ))
