const validateRole = require('../../../utils/validation');
const { LoginGuard } = require('../../../guards');

module.exports.getCategories = {
  method: 'get',
  path: '/categories',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ CategoriesService }) => (req, res) => {
    CategoriesService.getCategories().then((data) =>
      res.status(200).json(data)
    );
  },
};

module.exports.createCategory = {
  method: 'post',
  path: '/categories',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ CategoriesService }) => (req, res) => {
    CategoriesService.createCategory(req.body)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};

module.exports.updateCategory = {
  method: 'put',
  path: '/categories/:id',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ CategoriesService }) => (req, res) => {
    CategoriesService.updateCategory(+req.params.id, req.body)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};

module.exports.deleteCategory = {
  method: 'put',
  path: '/categories/:id',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ CategoriesService }) => (req, res) => {
    CategoriesService.deleteCategory(+req.params.id)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};

module.exports.productsInCategory = {
  method: 'get',
  path: '/categories/:id',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ CategoriesService }) => (req, res) => {
    CategoriesService.getCategory(+req.params.id)
      .then((data) => {
        console.log(JSON.stringify(data));
        res.json(data);
      })
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};
