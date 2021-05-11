const axios = require('axios').default;

const auth0Service = () => {
  let accessToken = null;

  const getAccessToken = async () => {
    if (accessToken) {
      console.log(`Bearer {accessToken}`)
      return accessToken;
    }

    const {
      data: { access_token },
    } = await axios.post(`${process.env.AUTH0_API_BASE_URL}/oauth/token`, {
      client_id: process.env.AUTH0_API_CLIENT_ID,
      client_secret: process.env.AUTH0_API_SECRET,
      audience: process.env.AUTH0_API_AUDIENCE,
      grant_type: 'client_credentials',
    });

    accessToken = access_token;
    
    console.log(`access token ${accessToken}`);
    return accessToken;
  };

  const getUsers = async () => {
    const token = await getAccessToken();

    const { data } = await axios.get(
      `${process.env.AUTH0_API_BASE_URL}/api/v2/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };

  const createUser = async ({ email, name, password }) => {
    const token = await getAccessToken();
    
    const { data } = await axios.post(
      `${process.env.AUTH0_API_BASE_URL}/api/v2/users`,
      {
        email,
        user_metadata: {},
        name,
        connection: process.env.AUTH0_DB_CONNECTION_NAME,
        password,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };

  const getRoles = async () => {
    const token = await getAccessToken();

    const { data } = await axios.get(
      `${process.env.AUTH0_API_BASE_URL}/api/v2/roles`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };

  const assignRoleToUser = async ({ userId, roleId }) => {
    const token = await getAccessToken();
    try {
      const { data } = await axios.post(
        `${process.env.AUTH0_API_BASE_URL}/api/v2/users/${userId}/roles`,
        {
          roles: [roleId],
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
        
      return data;
    } catch (error) {
      console.log(error);
    }
    
    
  };

  const getCurrentRole = async (obj) => {
    return obj;
  };

  return {
    getAccessToken,
    getUsers,
    createUser,
    getRoles,
    assignRoleToUser,
    getCurrentRole
  };
};

module.exports = auth0Service;
