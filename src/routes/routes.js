import dotenv from "dotenv"
dotenv.config()
import { IO } from "../socket.js"
import { Router } from "express"
import {
   CreateCategory,
   GetAllCategory,
   UpdateCategory,
   DeleteCategory,
} from "../controller/Category.js"
import { MakeUserseller, UserLogin, UserRegister } from "../controller/User.js"
import { expressjwt as jwt } from "express-jwt"

import {
   CreateProduct,
   DeleteProduct,
   GetAllProduct,
   GetProductByID,
   GetProductReview,
   MakeProductReview,
   ProductbyCategoryname,
   UpdateProduct,
} from "../controller/Product.js"

import {
   CreateAuction,
   GetAllAuction,
   GetAuctionbyID,
   PostAuction,
} from "../controller/Auction.js"

import { AllBidbyID, CreateBid } from "../controller/Bid.js"

import {
   Payment,
   VerifyPayment,
   MakewalletOrder,
   WalletComplete,
   Walletbalance,
   UserOrders,
   SellerOrders,
   ChangeOrderStatus,
} from "../controller/Order.js"

const router = Router()

const TokenMiddleWare = jwt({
   secret: process.env.JWT_SECRET,
   algorithms: ["HS256"],
})

//category
router.post("/category", CreateCategory)
router.get("/category", GetAllCategory)
router.put("/category", UpdateCategory)
router.delete("/category/:id", DeleteCategory)

//user
router.post("/login", UserLogin)
router.post("/register", UserRegister)

//product
router.get("/product", GetAllProduct)
router.get("/product/:id", GetProductByID)
router.get("/product/category/:id", ProductbyCategoryname)

router.post("/product", TokenMiddleWare, CreateProduct)
router.put("/product", TokenMiddleWare, UpdateProduct)
router.delete("/product/:id", TokenMiddleWare, DeleteProduct)

//auction
router.get("/auction", GetAllAuction)
router.get("/auction/item/:id", GetAuctionbyID)

router.post("/auction", TokenMiddleWare, CreateAuction)
router.put("/auction/:id", TokenMiddleWare, PostAuction)

//order
router.get("/userorder", TokenMiddleWare, UserOrders)
router.post("/payment", TokenMiddleWare, Payment)
router.post("/verify", TokenMiddleWare, VerifyPayment)
router.get("/sellerorder/:id", TokenMiddleWare, SellerOrders)
router.post("/changeorderstatus", TokenMiddleWare, ChangeOrderStatus)

//wallet
router.get("/wallet/:amount", MakewalletOrder)
router.post("/wallet", TokenMiddleWare, WalletComplete)
router.get("/walletbalance", TokenMiddleWare, Walletbalance)

//Bid
router.post("/bid", TokenMiddleWare, CreateBid)
router.get("/bid/:id", AllBidbyID)
export default router

//account
router.post("/makerseller", TokenMiddleWare, MakeUserseller)

//review
router.post("/review", TokenMiddleWare, MakeProductReview)
router.get("/review/:id", GetProductReview)

//test socket

router.get("/sockets", (req, res, next) => {
   IO.emit("test", "workingsss")
   res.send("333")
})
router.get("/sockets1", (req, res, next) => {
   IO.emit("test", "workingsss2")
   res.send("333")
})
