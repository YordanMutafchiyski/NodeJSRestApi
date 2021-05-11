const validateRole = require('../../../utils/validation');
const { LoginGuard } = require('../../../guards');

module.exports.getOrdersDetails = {
  method: 'get',
  path: '/ordersdetails',
  middlewares: [LoginGuard, validateRole(['Admin', 'Waiter', 'Bartender'])],
  handler: ({ OrdersDetailsService }) => (req, res) => {
    OrdersDetailsService.getOrdersDetails().then((data) =>
      res.status(200).json(data)
    );
  },
};

module.exports.addProductToOrder = {
  method: 'post',
  path: '/ordersdetails/:id/product/:productId',
  middlewares: [LoginGuard, validateRole(['Admin', 'Waiter', 'Bartender'])],
  handler: ({ OrdersDetailsService }) => (
    { params: { id, productId } },
    res
  ) => {
    OrdersDetailsService.addProductToOrder(+id, +productId).then((data) =>
      res.status(200).json(data)
    );
  },
};

module.exports.getOrdersDetailsByProduct = {
  method: 'get',
  path: '/ordersdetails/product/:id',
  middlewares: [LoginGuard, validateRole(['Admin', 'Waiter', 'Bartender'])],
  handler: ({ OrdersDetailsService }) => (req, res) => {
    OrdersDetailsService.getOrdersDetailsByProduct(
      +req.params.id
    ).then((data) => res.status(200).json(data));
  },
};
