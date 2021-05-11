const express = require('express');
const buildRouteValidators = require('./route-validators.js');
const safeHandler = require('./save-handler.js');

const routeValidator = (route) => {
  if (typeof route !== 'object') {
    throw new Error('The route should be an object!');
  }

  if (!route.method) {
    throw new Error('The route should have a method type!');
  }

  if (!route.path) {
    throw new Error('The route should have a path!');
  }

  if (!route.handler) {
    throw new Error('The route should have a handler!');
  }

  if (route.middlewares && !Array.isArray(route.middlewares)) {
    throw new Error('The middlewares should be an array!');
  }
};

const routeBuilder = (controller, handlerParams) =>
  Object.values(controller).reduce((acc, route) => {
    routeValidator(route);
    acc[route.method](
      route.path,
      ...buildRouteValidators(route),
      ...(Array.isArray(route.middlewares) ? route.middlewares : []),
      safeHandler(route.handler(handlerParams))
    );

    return acc;
  }, express.Router());

module.exports = routeBuilder;
