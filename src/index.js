import express from "express"
import dotenv from "dotenv"
import ConnectToDB from "./config/db.js"
import router from "./routes/routes.js"
import bodyParser from "body-parser"
dotenv.config()

const PORT= process.env.PORT
const app=express()


await ConnectToDB()
app.use(bodyParser.json())
app.use("/api",router)


app.listen(PORT,()=> console.log("server started on :",PORT))