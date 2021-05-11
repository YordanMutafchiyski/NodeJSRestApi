const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { auth } = require('express-openid-connect');
const fileUpload = require('express-fileupload');
const { LoginGuard } = require('../guards');

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: `http://${process.env.SERVER_HOST || '127.0.0.1'}:${
      process.env.SERVER_PORT
    }`,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    secret: process.env.AUTH0_SECRET,
  };

  app.use(auth(config));
  app.use(fileUpload());

  app.get('/', (req, res) => {
    res.send(
      req.oidc.isAuthenticated()
        ? `${JSON.stringify(req.oidc)}Logged in`
        : 'Logged out'
    );
  });

  app.get('/profile', LoginGuard, (req, res) => {
    res.send(JSON.stringify(req.user));
  });
};
