import Category from "../model/category.js"

export const GetAllCategory = async (req, res, next) => {
   try {
      const data = await Category.find({}).select(["name", "image", "desc"])
      return res.json(data)
   } catch (error) {
      next(error)
   }
}

export const CreateCategory = async (req, res) => {
   try {
      const { url: image, name, desc } = req.body
      await Category.create({ image, name, desc })
      res.json({ status: true })
   } catch {
      res.json({ status: false })
   }
}
export const UpdateCategory = async (req, res) => {
   try {
      const { image, name, desc, id } = req.body

      console.log(image)

      const filter = { _id: id }

      const update = { name, desc, image }

      await Category.findOneAndUpdate(filter, update)
      res.json({ status: true })
   } catch {
      res.send("error updating").status(500)
   }
}
export const DeleteCategory = async (req, res) => {
   try {
      const { id } = req.params
      await Category.deleteOne({ _id: id })

      res.json({ status: true })
   } catch (error) {
      console.log(error)
      res.json({ status: false })
   }
}
