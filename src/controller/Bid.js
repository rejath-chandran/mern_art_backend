import Bid from "../model/bid.js";
import user from "../model/user.js";
import Auction from "../model/auction.js";

export const CreateBid= async (req, res,next) => {
    try{let {amount,item}=req.body
        const userId=req.auth.userId
        let Bidder=await user.findById(userId)
        
        amount=parseInt(amount)

        if(amount>Bidder.balance){
            throw new Error("low balance")
        }

        let Item=await Auction.findById(item)
        let oldprice=parseInt(Item.price)
        Item.price=oldprice+amount
        Item.save()

        await Bid.create({
            item:item,
            bidder:Bidder._id,
            amount:Item.price
        })

        

        let oldBalance=Bidder.balance
        Bidder.balance=oldBalance-amount
        Bidder.save()

       res.status(201).json({"status":true})
    }catch(err){
        next(err)
    }
}

export const AllBidbyID= async (req, res,next) => {
    try{
        const {id}=req.params
        const items=await Bid.find({item:id}).populate("bidder","email").sort({amount:-1})
      res.status(200).json(items)
    }catch(err){
        next(err)
    }
}

