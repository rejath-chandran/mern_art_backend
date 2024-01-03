import express from "express"
import dotenv from "dotenv"
import ConnectToDB from "./config/db.js"
dotenv.config()
const PORT= process.env.PORT
const app=express()


await ConnectToDB()

app.get("/",(req,res)=>{
    res.json({
        name:"rejath"
    })
})

app.listen(PORT,()=>{
    console.log("server started on :",PORT)
})