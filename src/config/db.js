import mongoose from "mongoose"
import Auction from "../model/auction.js"
const ConnectToDB = async () => {
   try {
      let con = await mongoose.connect(process.env.DB_URL)
      console.log(`mongodb connected:${con.connection.host}`)

      const changestream=mongoose.connection.collection("auctions").watch()

      changestream.on('change', async (change) => {
      console.log(change)   
      })

      return con
   } catch (err) {
      console.log("DB ERROR:", err)
      process.exit(1)
   }
}

export default ConnectToDB
