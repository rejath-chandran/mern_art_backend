import express from "express"
import dotenv from "dotenv"
import ConnectToDB from "./config/db.js"
import router from "./routes/routes.js"
import cors from "cors"
import bodyParser from "body-parser"

dotenv.config()
const PORT = process.env.PORT
const app = express()

await ConnectToDB()

app.use(cors())
app.use(bodyParser.json())
app.use("/api", router)

app.use((err, req, res, next) => {
   res.status(500).json({ message: "something went wrong" })
   next(err)
})

app.listen(PORT, () => console.log("server started on :", PORT))
