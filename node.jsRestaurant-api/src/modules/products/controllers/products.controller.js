const validateRole = require('../../../utils/validation');
const createProductsDTO = require('../dto/products-create.dto');
const { LoginGuard } = require('../../../guards');

module.exports.getProductByName = {
  method: 'get',
  path: '/products',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ ProductsService }) => (req, res) => {
    if (req.query.name) {
      ProductsService.getProductsByName(req.query.name).then((data) =>
        res.status(200).json(data)
      );
    } else if (req.query.code) {
      ProductsService.getProductsByCode(req.query.code).then((data) =>
        res.status(200).json(data)
      );
    } else {
      ProductsService.getProducts().then((data) => res.status(200).json(data));
    }
  },
};

module.exports.createProduct = {
  method: 'post',
  path: '/products',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  body: createProductsDTO,
  handler: ({ ProductsService }) => (req, res) => {
    let categories = req.body.categories;
    if (categories) {
      delete req.body.categories;
      ProductsService.createProduct(req.body, categories)
        .then((data) => res.json(data))
        .catch((error) => {
          console.log(`${error.message}`);
          res.status(400).json(error);
        });
    } else {
      ProductsService.createProduct(req.body)
        .then((data) => res.json(data))
        .catch((error) => {
          console.log(`${error.message}`);
          res.status(400).json(error);
        });
    }
  },
};

module.exports.updateProduct = {
  method: 'put',
  path: '/products/:id',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ ProductsService }) => (req, res) => {
    ProductsService.updateProduct(+req.params.id, req.body)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};

module.exports.deleteProduct = {
  method: 'delete',
  path: '/products/:id',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ ProductsService }) => (req, res) => {
    ProductsService.deleteProduct(+req.params.id)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};
