const { Op } = require('sequelize');
const { ProductsController } = require('../controllers');

module.exports = ({ models: { Product,Category } }) => {
  const getProducts = () =>
    Product.findAll({
      limit: 10,
      where: {
        [Op.or]: [{ isDeleted: null }, { isDeleted: 0 }],
      },
      include: [
        {
          model: Category,
        }
      ],
    });

  const getProductsByName = async (name) => {
    const product = await Product.findOne({
      where: {
        name,
      },
    });

    return product;
  };

  const getProductsByCode = async (code) => {
    const product = await Product.findOne({
      where: {
        code,
      },
    });

    return product;
  };

  const createProduct = async (productData, categories) => {
    let product = await Product.findOne({
      where: {
        name: productData.name,
      },
    });

    if (product) {
      throw new Error('A product with that name already exists!');
    }

    if (categories) {
      await Product.create(productData);
      product = await Product.findOne({
        where: {
          name: productData.name,
        },
      });
      categories.forEach((cat) => {
        product.addCategory(cat);
      });
    } else {
      return Product.create(productData);
    }

    return product;
  };

  const deleteProduct = async (id) => {
    const product = await Product.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error('A product with that id does not exist!');
    }

    return await Product.update({
      isDelete: true,
    });
  };
  const updateProduct = async (id, payload) => {
    const product = await Product.findOne({
      where: {
        id,
      },
      returning: true,
    });
    if (!product) {
      throw new Error('A product with that id does not exist!');
    }
    return Product.update(payload);
  };

  return {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductsByName,
    getProductsByCode,
  };
};
