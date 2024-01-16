

export const GetAllProduct = async (req, res, next) => {
    try {
        console.log(req.auth)
        res.json({"status":"bro"})
    } catch (error) {
       next(error)
    }
 }

 export const CreateProduct = async (req, res, next) => {
    try {
        console.log(req.auth)
        res.status(201).json({"status":"bro"})
    } catch (error) {
       next(error)
    }
 }

 export const GetProductByID = async (req, res, next) => {
    try {
        console.log(req.auth)
        res.status(201).json({"status":"bro"})
    } catch (error) {
       next(error)
    }
 }
 export const UpdateProduct = async (req, res, next) => {
    try {
        console.log(req.auth)
        res.status(201).json({"status":"bro"})
    } catch (error) {
       next(error)
    }
 }
 
 export const DeleteProduct = async (req, res, next) => {
    try {
        console.log(req.auth)
        res.status(201).json({"status":"bro"})
    } catch (error) {
       next(error)
    }
 }