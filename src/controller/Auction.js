import Auction from "../model/auction.js"

export const CreateAuction = async (req, res, next) => {
   try {
      const artist = req.auth.userId
      const { name, desc, category, price, url: image } = req.body
      await Auction.create({ name, desc, category, price, image, artist })
      res.status(201).json({ status: true })
   } catch (error) {
      next(error)
   }
}

export const GetAllAuction = async (req, res, next) => {
   try {

      const items = await Auction.find({}).populate(['category','artist'])
      let formattedItems = items.map((i) => ({
         _id: i._id.toHexString(),
         name: i.name,
         image: i.image,
         desc: i.desc,
         category: i?.category?.name,
         artist: i?.artist?.name,
         price: i.price,
         sold: i.sold,
         winner:i.winner
      }))
      res.json(formattedItems)
   } catch (error) {
      next(error)
   }
}
export const PostAuction = async (req, res, next) => {
   try {
      res.status(201).json({ status: true })
   } catch (error) {
      next(error)
   }
}
