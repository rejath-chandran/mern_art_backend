import wallet from "../model/wallet.js"
import system from "../model/sytem.js"
import Product from "../model/product.js"
import user from "../model/user.js"
export const MakeWalletWithdrawrequest = async (req, res, next) => {
   try {
      const userId = req.auth.userId
      const { amount, upi } = req.body
      let config = await system.findOne({})
      let real_amount = (parseInt(amount) / 100) * parseInt(config.com)
      let data = {
         user: userId,
         withdraw: amount,
         amount: real_amount,
         comm: config.com,
         upi: upi,
      }
      console.log(data)
      await wallet.create(data)
      res.status(201).json({ status: true })
   } catch (error) {
      next(error)
   }
}

export const UserWalletTable = async (req, res, next) => {
   try {
      const userId = req.auth.userId
      const { type } = req.query
      if (type === "process") {
         let data = await wallet.find({ status: "processing", user: userId })
         res.status(200).json(data)
      } else {
         let data = await wallet.find({ status: "done", user: userId })
         res.status(200).json(data)
      }
   } catch (error) {
      next(error)
   }
}
export const AdminWalletTable = async (req, res, next) => {
   try {
      const { type } = req.query
      if (type === "processed") {
         let data = await wallet.find({ status: "processing" })
         res.status(200).json(data)
      } else {
         let data = await wallet.find({ status: "done" })
         res.status(200).json(data)
      }
   } catch (error) {
      next(error)
   }
}

export const AdminWalletStatus = async (req, res, next) => {
   try {
      const { id } = req.body
      await wallet.findOneAndUpdate({ _id: id }, { status: "done" })
      res.status(200).json({ status: true })
   } catch (erro) {
      next(erro)
   }
}
export const AdminDashorad=async(req,res,next)=>{
    try{
        let count_product=await Product.find({}).count()
        let count_user=await user.find({}).count()
        let recent_user=await user.find({}).sort({_id:-1}).limit(2)
        let top_product=await Product.find({}).populate('artist').sort({price:-1}).limit(10)
        let state = {
            options: {
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                name:"MONTHS",
                categories: ['MAR','APR','MAY','JUN','JULY','AUG','SEP','NOV','DEC'],
              },
            },
            series: [
              {
                name: "USER COUNT",
                data: [count_user, 0, 0, 0, 0, 0, 0, 0],
              }
            ],
          };
        res.status(200).json({count_product,count_user,chart:state,recent_user,top_product})
    }catch(error){
        next(error)
    }
}