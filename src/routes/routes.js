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
import {
   MakeUserseller,
   UserLogin,
   UserRegister,
   SellerInfo,
   SetSystem,
   GetSystem,
   GetAllUsersinApp,
} from "../controller/User.js"
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
   ProductByArtistId,
   ProductByArtistSeller,
} from "../controller/Product.js"

import {
   CreateAuction,
   DeleteAuctionByid,
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
import {
   AdminDashorad,
   AdminWalletStatus,
   AdminWalletTable,
   MakeWalletWithdrawrequest,
   UserWalletTable,
} from "../controller/wallet.js"
import {
   DeleteSupportById,
   GetAllUserSupport,
   MakeUserSupport,
} from "../controller/support.js"
import {
   GetCommentByProduct,
   MakeCommentByProduct,
} from "../controller/comment.js"

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
router.post("/make_comment", TokenMiddleWare, MakeCommentByProduct)
router.get("/get_comment/:id", GetCommentByProduct)

//user
router.post("/login", UserLogin)
router.post("/register", UserRegister)
router.get("/seller/:id", SellerInfo)
router.get("/app_users", GetAllUsersinApp)

//product
router.get("/product", GetAllProduct)
router.get("/product/:id", GetProductByID)
router.get("/product/category/:id", ProductbyCategoryname)
router.get("/product/artist/:id", ProductByArtistId)
router.get("/artist_product",TokenMiddleWare,ProductByArtistSeller)  

router.post("/product", TokenMiddleWare, CreateProduct)
router.put("/product", TokenMiddleWare, UpdateProduct)
router.delete("/product/:id", TokenMiddleWare, DeleteProduct)

//auction
router.get("/auction", GetAllAuction)
router.get("/auction/item/:id", GetAuctionbyID)

router.post("/auction", TokenMiddleWare, CreateAuction)
router.put("/auction/:id", TokenMiddleWare, PostAuction)
router.delete("/auction/:id", TokenMiddleWare, DeleteAuctionByid)
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

router.post("/wallet_request", TokenMiddleWare, MakeWalletWithdrawrequest)
router.get("/user_wallet_table", TokenMiddleWare, UserWalletTable)

router.get("/admin_wallet_table", AdminWalletTable)
router.post("/change_wallet_status", AdminWalletStatus)
router.get("/admin_dashboard", AdminDashorad)

//Bid
router.post("/bid", TokenMiddleWare, CreateBid)
router.get("/bid/:id", AllBidbyID)

//account
router.post("/makerseller", TokenMiddleWare, MakeUserseller)

//review
router.post("/review", TokenMiddleWare, MakeProductReview)
router.get("/review/:id", GetProductReview)

//
router.post("/system", TokenMiddleWare, SetSystem)
router.get("/system", GetSystem)

//support
router.post("/create_support", MakeUserSupport)
router.get("/support", GetAllUserSupport)
router.post("/delete_support", DeleteSupportById)

//test socket

router.get("/sockets", (req, res, next) => {
   IO.emit("test", "workingsss")
   res.send("333")
})
router.get("/sockets1", (req, res, next) => {
   IO.emit("test", "workingsss2")
   res.send("333")
})

export default router
