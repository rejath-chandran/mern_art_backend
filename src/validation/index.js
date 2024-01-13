import Joi from "joi"

const UserValid = (user) => {
   const Schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
   })
   return Schema.validate(user)
}

export { UserValid }
