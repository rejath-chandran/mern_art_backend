import Comment from "../model/comments.js"

export const GetCommentByProduct = async (req, res, next) => {
   try {
      const { id } = req.params
      let data = await Comment.find({ product: id }).populate("user")
      res.status(200).json(data)
   } catch (error) {
      next(error)
   }
}

export const MakeCommentByProduct = async (req, res, next) => {
   try {
      const { message, rating, product } = req.body
      const { userId } = req.auth
      await Comment.create({ message, rating, product, user: userId })

      res.status(200).json({ status: true })
   } catch (error) {
      next(error)
   }
}
