export const CreateAuction = async (req, res,next) => {
    try {
     
       res.status(201).json({ status: true })
    } catch (error) {
       next(error)
    }
 }

 export const GetAllAuction = async (req, res,next) => {
    try {
       
       res.status(201).json({ status: true })
    } catch (error) {
       next(error)
    }
 }
 export const PostAuction = async (req, res,next) => {
    try {
       
       res.status(201).json({ status: true })
    } catch (error) {
       next(error)
    }
 }