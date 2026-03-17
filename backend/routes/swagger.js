const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const router = express.Router();

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Acronym Backend API',
      version: '1.0.0'
    },
    servers: [{ url: '/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: []
});

swaggerSpec.paths = {
  '/auth/signup': {
    post: {
      summary: 'Sign up',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'email', 'password'],
              properties: {
                name: { type: 'string', example: 'SyukranDev' },
                email: { type: 'string', example: 'syukrandev@gg.com' },
                password: { type: 'string', example: 'abc123' }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'User created' },
        422: { description: 'Validation error' },
        500: { description: 'Server error' }
      }
    }
  },
  '/auth/login': {
    post: {
      summary: 'Login',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', example: 'syukrandev@gg.com' },
                password: { type: 'string', example: 'abc123' }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Logged in (returns token)' },
        401: { description: 'Unauthorized' },
        422: { description: 'Validation error' },
        429: { description: 'Too many attempts (rate limited)' },
        500: { description: 'Server error' }
      }
    }
  },
  '/user/profile': {
    get: {
      summary: 'Get user profile',
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: 'User profile' },
        401: { description: 'Unauthorized' },
        500: { description: 'Server error' }
      }
    }
  }
};

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec, { explorer: true }));

module.exports = router;

