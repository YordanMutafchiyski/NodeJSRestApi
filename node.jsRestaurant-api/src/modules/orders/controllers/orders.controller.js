const validateRole = require('../../../utils/validation');
const { LoginGuard } = require('../../../guards');

module.exports.getOrders = {
  method: 'get',
  path: '/orders',
  middlewares: [LoginGuard, validateRole(['Admin', 'Waiter', 'Bartender'])],
  handler: ({ OrdersService }) => (req, res) => {
    OrdersService.getOrders(+req.query.page, +req.query.limit).then((data) =>
      res.status(200).json(data)
    );
  },
};

module.exports.createOrder = {
  method: 'post',
  path: '/orders',
  middlewares: [LoginGuard, validateRole(['Admin', 'Waiter', 'Bartender'])],
  handler: ({ OrdersService }) => (req, res) => {
    OrdersService.createOrder(req.body)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};

module.exports.updateOrder = {
  method: 'put',
  path: '/orders/:id',
  middlewares: [LoginGuard, validateRole(['Admin', 'Waiter', 'Bartender'])],
  handler: ({ OrdersService }) => (req, res) => {
    OrdersService.updateOrder(+req.params.id, req.body)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};

module.exports.deleteOrder = {
  method: 'delete',
  path: '/orders/:id',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ OrdersService }) => (req, res) => {
    OrdersService.deleteOrder(+req.params.id)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};

module.exports.closeOrder = {
  method: 'put',
  path: '/orders/:id/close',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ OrdersService }) => (req, res) => {
    OrdersService.closeOrder(+req.params.id)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};

module.exports.getOrderByProduct = {
  method: 'get',
  path: '/orders/product/:id',
  middlewares: [LoginGuard, validateRole(['Admin', 'Waiter', 'Bartender'])],
  handler: ({ OrdersService }) => (req, res) => {
    OrdersService.getOrdersDetailsByProduct(+req.params.id).then((data) =>
      res.status(200).json(data)
    );
  },
};

module.exports.getOrderByStatus = {
  method: 'get',
  path: '/orders/isActive/:boolean',
  middlewares: [LoginGuard, validateRole(['Admin', 'Waiter', 'Bartender'])],
  handler: ({ OrdersService }) => (req, res) => {
    OrdersService.getOrderByIsActive(+req.params.boolean).then((data) =>
      res.status(200).json(data)
    );
  },
};
