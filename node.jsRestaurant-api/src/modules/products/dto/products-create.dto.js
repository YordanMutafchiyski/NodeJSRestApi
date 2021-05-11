const Joi = require('joi');


const createProductsDTO = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  description: Joi.string(),
  imagePath: Joi.string(),
  price: Joi.number().required(),
  categories: Joi.array()
});

module.exports = createProductsDTO;