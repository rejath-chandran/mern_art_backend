import wallet from "../model/wallet.js"
import system from "../model/sytem.js"
export const MakeWalletWithdrawrequest=async(req,res,next)=>{
    try{
        const userId = req.auth.userId
        const {amount,upi}=req.body
        let config=await system.findOne({})
        let real_amount=(parseInt(amount)/100)*parseInt(config.com)
        let data={
            user:userId,
            withdraw:amount,
            amount:real_amount,
            comm:config.com,
            upi:upi,
        }
        console.log(data)
        await wallet.create(data)
        res.status(201).json({status:true})
    }catch(error){
        next(error)
    }
}

export const UserWalletTable=async(req,res,next)=>{
    try{
    const userId = req.auth.userId
      const { type }=req.query
      if(type==='process'){
            let data=await wallet.find({status:"processing",user:userId})
            res.status(200).json(data)
      }else{
        let data=await wallet.find({status:"done",user:userId})
        res.status(200).json(data)
      }
     
    }catch(error){
        next(error)
    }
}
export const AdminWalletTable=async(req,res,next)=>{
    try{
        const {type}=req.query
        if(type==="processed"){
            let data=await wallet.find({status:"processing"})
            res.status(200).json(data)
        }else{
            let data=await wallet.find({status:"done"})
            res.status(200).json(data)
        }
    }catch(error){
        next(error)
    }
}


export const AdminWalletStatus=async(req,res,next)=>{
    try{
        const {id}=req.body
        await wallet.findOneAndUpdate({_id:id},{status:"done"})
        res.status(200).json({status:true})
    }catch(erro){
        next(erro)
    }
}