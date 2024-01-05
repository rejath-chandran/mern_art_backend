import { Router } from "express";



const router=Router()

//category

router.post("/category")  //create
router.get("/category") //read all

router.get("/category/:id") //get by id
router.put("category/:id") //update by id
router.delete("/category/:id") //delete


//product
router.get("/product")
router.post("/product")
router.put("/product/:id")
router.delete("/category/:id")
//user


//wallet


export default router