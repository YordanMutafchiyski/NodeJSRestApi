const { Op } = require('sequelize');

const { OrdersController } = require('../controllers');

module.exports = ({ models: { Order, Order_Details, User } }) => {
  const getOrders = async (page, limitOrders) => {
    if (page && limitOrders) {
      return await Order.findAll({
        where: {
          [Op.or]: [{ isDeleted: null }, { isDeleted: 0 }],
        },
        offset: page,
        limit: limitOrders,
      });
    } else {
      return await Order.findAll({
        where: {
          [Op.or]: [{ isDeleted: null }, { isDeleted: 0 }],
        },
        include: [
          {
            model: User,
          },
        ],
      });
    }
  };

  const createOrder = async (orderData) => {
    let order = await Order.findOne({
      where: {
        tableId: +orderData.tableId,
        isActive: true,
      },
    });

    if (order) {
      throw new Error('There is active order on this table!');
    }
    return Order.create(orderData);
  };

  const deleteOrder = async (id) => {
    const order = await Order.findOne({
      where: {
        id,
      },
    });

    if (!order) {
      throw new Error('A order with that id does not exist!');
    }

    return await Order.update({
      isDeleted: true,
    });
  };
  const updateOrder = async (id, payload) => {
    const order = await Order.findOne({
      where: {
        id,
      },
      returning: true,
    });
    if (!order) {
      throw new Error('A order with that id does not exist!');
    }
    return Order.update(payload);
  };

  const closeOrder = async (id) => {
    const order = await Order.findOne({
      where: {
        [Op.and]: [{ id }, { isActive: true }],
      },
      returning: true,
    });
    if (!order) {
      throw new Error(
        'A order with that id does not exist or it is already closed!'
      );
    }
    return order.update({
      isActive: false,
    });
  };

  const getOrdersDetailsByProduct = async (id) =>
    await Order.findAll({
      include: {
        model: Order_Details,
        where: {
          product_id: id,
        },
      },
    });

  const getOrderByIsActive = async (isActive) =>
    await Order.findAll({
      where: {
        isActive: isActive,
      },
    });

  return {
    getOrders,
    createOrder,
    deleteOrder,
    updateOrder,
    closeOrder,
    getOrdersDetailsByProduct,
    getOrderByIsActive,
  };
};
