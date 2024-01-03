import mongoose  from "mongoose";

 const ConnectToDB=async()=>{
    try{
       let con=await mongoose.connect(process.env.DB_URL)
        console.log(`mongodb connected:${con.connection.host}`)
    }catch(err){
        console.log("DB ERROR:",err)
    }
}

export default ConnectToDB