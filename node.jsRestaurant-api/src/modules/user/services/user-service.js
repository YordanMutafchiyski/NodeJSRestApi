module.exports = ({ models: { User }, Auth0Service }) => {
  const getUsers = () => User.findAll({});

  const createUser = async (userData) => {
    const user = await User.findOne({
      where: {
        email: userData.email,
      },
    });

    if (user) {
      throw new Error('A user with that email already exists!');
    }

    return User.create(userData);
  };

  const getRoles = () => Auth0Service.getRoles();

  const addImagePath = async (userId, path) => {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('A user with that id does not exist!');
    }

    return user.update({
      ImagePath: path,
    });
  };
  return {
    getUsers,
    createUser,
    getRoles,
    addImagePath,
  };
};
