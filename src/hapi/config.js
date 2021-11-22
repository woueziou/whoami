const Pack = require('../../package.json');
const swaggerOptions = {
  schemes: ['http', 'https'],
  documentationPath: '/',
  info: {
    title: `${process.env.APP_NAME} Server api doc`,
    version: Pack.version,
    contact: {
      name: 'Taas Ekpaye',
      email: 'taasekpaye@outlook.fr',
    },
  },
  security: [
    {
      api_key: {
        type: 'apiKey', // apiKey is defined by the Swagger spec
        name: 'Authorization', // the name of the query parameter / header
        in: 'header',
      },
    },
  ],
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  grouping: 'tags',
};

module.exports = { swaggerOptions };