import Support from "../model/support.js"
export const MakeUserSupport = async (req, res, next) => {
   try {
      const { email, message } = req.body
      console.log(email, message)
      await Support.create({
         email: email,
         messsage: message,
      })
      res.status(201).json({ status: true })
   } catch (error) {
      next(error)
   }
}

export const GetAllUserSupport = async (req, res, next) => {
   try {
      let data = await Support.find({}).sort({ _id: -1 })
      res.status(200).json(data)
   } catch (error) {
      next(error)
   }
}
export const DeleteSupportById = async (req, res, next) => {
   try {
      const { id } = req.body
      await Support.findByIdAndDelete(id)
      res.status(200).json({ status: true })
   } catch (error) {
      next(error)
   }
}
