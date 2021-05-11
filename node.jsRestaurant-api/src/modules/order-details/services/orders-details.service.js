const { Op } = require('sequelize');

module.exports = ({ models: { Order_Details, Order, Product } }) => {
  const getOrdersDetails = () =>
    Order_Details.findAll({
      limit: 10,
      where: {
        [Op.or]: [{ isDeleted: null }, { isDeleted: 0 }],
      },
      group: ['order_id'],
    });

  const addProductToOrder = async (id, productId) => {
    let order = await Order.findOne({
      where: {
        [Op.or]: [{ id }, { isActive: true }],
      },
    });
    let product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    let productInOrderDetails = await Order_Details.findOne({
      where: {
        [Op.and]: [{ product_id: productId }, { order_id: id }],
      },
    });
    let orderInOrderDetails = await Order_Details.findOne({
      where: {
        order_id: id,
      },
    });
    if (!order) {
      throw new Error(
        "An order with that id doesn\t exist or it's already finished!"
      );
    }
    if (!product) {
      throw new Error('A product with that id doesn\t exist!');
    }
    if (productInOrderDetails) {
      await productDetails.update({
        quantity: productInOrderDetails.quantity + 1,
      });

      return productDetails;
    } else if (orderInOrderDetails) {
      let obj = {
        order_id: id,
        product_id: productId,
        product_price: product.price,
      };
      return await Order_Details.create(obj);
    }
  };

  return {
    getOrdersDetails,
    addProductToOrder,
  };
};
