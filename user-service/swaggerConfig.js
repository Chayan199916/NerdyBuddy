// swaggerConfig.js

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NerdyBuddy API Documentation',
      version: '1.0.0',
      description: 'API documentation for the project',
      contact: {
        name: 'NerdyBuddy',
        email: 'swapnomoy199916@gmail.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
