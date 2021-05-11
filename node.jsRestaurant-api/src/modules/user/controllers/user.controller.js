const createUserDTO = require('../dto/user-create.dto');
const appRoot = require('app-root-path');
const { LoginGuard } = require('../../../guards');

module.exports.getUsers = {
  method: 'get',
  path: '/users',
  middlewares: [LoginGuard],
  handler: ({ UserService }) => (req, res) => {
    UserService.getUsers().then((data) => res.status(200).json(data));
  },
};

module.exports.createUser = {
  method: 'post',
  path: '/users',
  middlewares: [],
  body: createUserDTO,
  handler: ({ UserService, Auth0Service }) => async (req, res) => {
    let bodyWithAuthId = req.body;
    let { user_id } = await Auth0Service.createUser(req.body);
    bodyWithAuthId['authId'] = user_id;
    UserService.createUser(bodyWithAuthId)
      .then((data) => res.json(data))
      .catch((error) => {
        console.log(`${error.message}`);
        res.status(400).json(error);
      });
  },
};

module.exports.getRoles = {
  method: 'get',
  path: '/users/roles',
  middlewares: [LoginGuard],
  handler: ({ Auth0Service }) => (req, res) => {
    Auth0Service.getRoles(req.body)
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json(error));
  },
};

module.exports.assignRoleToUser = {
  method: 'post',
  path: '/users/:userId/roles/:roleId',
  middlewares: [LoginGuard],
  handler: ({ Auth0Service }) => ({ params: { roleId, userId } }, res) =>
    Auth0Service.assignRoleToUser({
      userId,
      roleId,
    })
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json(error)),
};

module.exports.uploadImage = {
  method: 'post',
  path: '/users/:userId/avatar',
  middlewares: [LoginGuard],
  handler: ({ UserService }) => (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    let userId = +req.params.userId;
    const file = req.files.file;
    if (file.size > 5e6) {
      return res.status(500).send('File is bigger than 5mb!');
    }
    uploadPath = `${appRoot}/public/${file.name}`;

    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      UserService.addImagePath(userId, uploadPath);
      res.send('File uploaded');
    });
  },
};
