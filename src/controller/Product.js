import Category from "../model/category.js"
import Product from "../model/product.js"
import { IO } from "../socket.js"
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
         price: i?.price,
      }))
      res.json(formattedItems)
   } catch (error) {
      next(error)
   }
}

export const CreateProduct = async (req, res, next) => {
   try {
      const artist = req.auth.userId
      const { name, desc, category, url: image, price } = req.body
      await Product.create({
         name,
         image,
         desc,
         category,
         artist,
         price,
      })
      // IO.on("connection", (socket) => {
      //    socket.emit("notify", [
      //       {
      //          id: 1,
      //          message: "New art is store",
      //          date: new Date().toISOString().split("T")[0],
      //       },
      //    ])
      // })
      res.status(201).json({ status: true })
   } catch (error) {
      next(error)
   }
}

export const ProductByArtistId = async (req, res, next) => {
   try {
      const { id } = req.params
      // if (id == 1) {
      //    id = req.auth
      // }
      const Products = await Product.find({ artist: id }).populate("artist")
      res.status(200).json(Products)
   } catch (error) {
      next(error)
   }
}

export const GetProductByID = async (req, res, next) => {
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
         artistId: item.artist._id,
         price: item?.price,
      }

      res.status(200).json(formattedItems)
   } catch (error) {
      next(error)
   }
}
export const UpdateProduct = async (req, res, next) => {
   try {
      const { url: image, name, desc, _id, category, price } = req.body

      const filter = { _id: _id }
      let update

      if (image == "") {
         update = { name, desc, category, price }
      } else {
         update = { name, desc, category, price, image }
      }

      await Product.findOneAndUpdate(filter, update)
      res.status(200).json({ status: "sucess" })
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

export const MakeProductReview = async (req, res, next) => {
   try {
      const { pid, stars, review } = req.body
   } catch (error) {
      next(error)
   }
}

export const GetProductReview = async (req, res, next) => {
   try {
   } catch (error) {
      next(error)
   }
}
export const ProductByArtistSeller = async (req, res, next) => {
   try {
      const { userId } = req.auth
      let data = await Product.find({ artist: userId }).populate("category")
      res.status(200).json(data)
   } catch (error) {
      next(error)
   }
}

export const GetSearchProducts = async (req, res, next) => {
   try {
      const { item } = req.params
      // let data=await Product.find({ $text: { $search: item} })
      let data = await Product.find({
         $or: [
            { name: { $regex: item, $options: "i" } },

            { desc: { $regex: item, $options: "i" } },
         ],
      }).populate("artist")
      res.status(200).json(data)
   } catch (error) {
      next(error)
   }
}
