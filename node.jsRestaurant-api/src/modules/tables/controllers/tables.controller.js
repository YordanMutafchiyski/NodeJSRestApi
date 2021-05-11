const validateRole = require('../../../utils/validation');
const { LoginGuard } = require('../../../guards');

module.exports.getTables = {
  method: 'get',
  path: '/tables',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ TablesService }) => (req, res) => {
    TablesService.getTables().then((data) => res.status(200).json(data));
  },
};

module.exports.createTable = {
  method: 'post',
  path: '/tables',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ TablesService }) => (req, res) => {
    TablesService.createTable(req.body)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};

module.exports.updateTable = {
  method: 'put',
  path: '/tables/:id',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ TablesService }) => (req, res) => {
    TablesService.updateCategory(+req.params.id, req.body)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};

module.exports.deleteTable = {
  method: 'put',
  path: '/tables/:id',
  middlewares: [LoginGuard, validateRole(['Admin'])],
  handler: ({ TablesService }) => (req, res) => {
    TablesService.deleteTable(+req.params.id)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};
