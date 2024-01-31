import express from "express"
import dotenv from "dotenv"
import ConnectToDB from "./config/db.js"
import router from "./routes/routes.js"
import cors from "cors"
import bodyParser from "body-parser"
import { createServer } from "http"
import { SocketInit, IO } from "./socket.js"
import { Socket } from "socket.io"
dotenv.config()

const PORT = process.env.PORT
const app = express()

let httpserver = new createServer(app)
SocketInit(httpserver)
await ConnectToDB()

app.use(cors())
app.use(bodyParser.json())
app.use("/api", router)

app.use((err, req, res, next) => {
   res.status(500).json({ message: "something went wrong" })
   next(err)
})
IO.on("connection", (s) => {
   console.log(s.id)
   IO.emit("newm", "haaaaaaaaa")
})
// IO.emit("newProduct","heyyyyy")
httpserver.listen(PORT, () => console.log("server started on :", PORT))
