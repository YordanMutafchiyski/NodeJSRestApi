const { sequelize, models } = require('./../../database/connection.js');
const UserService = require('../../modules/user/services/user-service')({
  models,
  Auth0Service: {
    createUser: () => ({ user_id: 'dasdasdasdadasda' }),
  },
});

describe('Get Users Method', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('Should return all created users', async () => {
    await models.User.create({
      firstName: 'Yavor',
      lastName: 'Stoychev',
      email: 'yavor.stoychev@mentormate.com',
      password: 'Parola123!',
    });

    const allUsers = await UserService.getUsers();

    expect(allUsers.length).toBe(1);
    expect(allUsers[0].dataValues).toEqual({
      id: 1,
      firstName: 'Yavor',
      lastName: 'Stoychev',
      email: 'yavor.stoychev@mentormate.com',
    });
  });

  it('Shoud return empty array', async () => {
    const allUsers = await UserService.getUsers();

    expect(allUsers.length).toBe(0);
  });

  it('Shoud throw an error when we try to create a user with an email that already has been taken', async () => {
    expect.assertions(1);

    await models.User.create({
      firstName: 'Yavor',
      lastName: 'Stoychev',
      email: 'yavor.stoychev@mentormate.com',
      password: 'Parola123!',
    });

    try {
      await UserService.createUser({
        firstName: 'Yavor',
        lastName: 'Stoychev',
        email: 'yavor.stoychev@mentormate.com',
        password: 'Parola123!',
      });
    } catch ({ message }) {
      expect(message).toBe('A user with that email already exists!');
    }
  });
});

afterAll(() => {
  sequelize.close();
});
