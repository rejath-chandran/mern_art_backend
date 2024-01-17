import Category from "../model/category.js"
import Product from "../model/product.js"

export const GetAllProduct = async (req, res, next) => {
   try {
      const items = await Product.find({})
         .populate(["category", "artist"])
         .exec()
      let formattedItems = items.map((i) => ({
         _id: i._id.toHexString(),
         name: i.name,
         image: i.image,
         desc: i.desc,
         category: i.category.name,
         artist: i.artist.name,
      }))
      res.json(formattedItems)
   } catch (error) {
      next(error)
   }
}

export const CreateProduct = async (req, res, next) => {
   try {
      const artist = req.auth.userId
      const { name, desc, category, url: image } = req.body
      await Product.create({
         name,
         image,
         desc,
         category,
         artist,
      })
      res.status(201).json({ status: true })
   } catch (error) {
      next(error)
   }
}


   export const GetProductByID= async (req, res, next) => {
      try {
         const { id } = req.params
   
         let item = await Product.findById(id).populate(["category", "artist"])
         let formattedItems = {
            _id: item._id?.toHexString(),
            name: item?.name,
            image: item?.image,
            desc: item?.desc,
            category: item?.category.name,
            artist: item?.artist.name,
            price: item?.price,
         }
   
         res.status(200).json(formattedItems)
      } catch (error) {
         next(error)
      }
   }
export const UpdateProduct = async (req, res, next) => {
   try {
      const { url: image, name, desc, _id, category } = req.body
      const filter = { _id: _id }
      const update = { image, name, desc, category }

      await Product.findOneAndUpdate(filter, update)
      res.status(200).json({ status: "bro" })
   } catch (error) {
      next(error)
   }
}

export const DeleteProduct = async (req, res, next) => {
   try {
      const { id } = req.params
      await Product.deleteOne({ _id: id })
      res.status(200).json({ status: "bro" })
   } catch (error) {
      next(error)
   }
}

export const ProductbyCategoryname = async (req, res, next) => {
   try {
      const { id } = req.params
      const category = await Category.findOne({ name: id })
      const items = await Product.find({ category: category._id })
         .populate(["category", "artist"])
         .exec()
      let formattedItems = items.map((i) => ({
         _id: i._id.toHexString(),
         name: i.name,
         image: i.image,
         desc: i.desc,
         category: i.category.name,
         artist: i.artist.name,
         price: i.price,
      }))
      res.json(formattedItems)
   } catch (error) {
      next(error)
   }
}
