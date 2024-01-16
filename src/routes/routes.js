import dotenv from "dotenv"
dotenv.config()

import { Router } from "express"
import {
   CreateCategory,
   GetAllCategory,
   UpdateCategory,
   DeleteCategory,
} from "../controller/Category.js"
import { UserLogin, UserRegister } from "../controller/User.js"
import { expressjwt as jwt } from "express-jwt"
import {
   CreateProduct,
   DeleteProduct,
   GetAllProduct,
   GetProductByID,
   ProductbyCategoryname,
   UpdateProduct,
} from "../controller/Product.js"
import {
   CreateAuction,
   GetAllAuction,
   PostAuction,
} from "../controller/Auction.js"

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
router.get("/product/category/:id",ProductbyCategoryname)


router.post("/product", TokenMiddleWare, CreateProduct)
router.put("/product", TokenMiddleWare, UpdateProduct)
router.delete("/product/:id", TokenMiddleWare, DeleteProduct)

//auction
router.get("/auction", TokenMiddleWare, GetAllAuction)
router.post("/auction", TokenMiddleWare, CreateAuction)
router.put("/auction/:id", TokenMiddleWare, PostAuction)

export default router
