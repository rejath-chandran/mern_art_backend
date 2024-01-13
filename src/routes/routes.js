import { Router } from "express"
import {
   CreateCategory,
   GetAllCategory,
   UpdateCategory,
   DeleteCategory,
} from "../controller/Category.js"
import { UserLogin, UserRegister } from "../controller/User.js"
import { expressjwt as jwt } from "express-jwt"

const router = Router()
const TokenMiddleWare = jwt({
   secret: "shhhhhhared-secret",
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
// router.get("/")

// //product
// router.get("/product")
// router.post("/product")
// router.put("/product/:id")
// router.delete("/category/:id")
// //user

// //wallet

export default router
