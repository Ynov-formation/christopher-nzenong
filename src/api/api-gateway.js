const gateway = require('fast-gateway');

const authenticateMiddleware = require('../middleware/authentificationMiddleware')

console.log('authentication middleware', authenticateMiddleware)

const errorHandlerMiddleware = require('../middleware/errorHandlerMiddleware')

const port = 3001;



const server = gateway ( {
    routes: [
      {
        // route pour le service authentification
        prefix: '/auth/*',
        target: 'http://localhost:3002/',
        hooks: {
            onRequest: (req, res) => {
            },
          },
      },
      ,
    {
      // Route pour le service utilisateur
      prefix: '/users/*',
      target: 'http://localhost:3003/',
      hooks: {
        onRequest: async (req, res) => {
          
          authenticateMiddleware(req, res , () => {

            console.log('User authenticated:', req.user);

            res.continue();

          });
        },
      },
    },
    {
      // Route pour le service client
      prefix: '/clients/*',
      target: 'http://localhost:3004',
      hooks: {
        onRequest: async (req, res) => {
          
          authenticateMiddleware(req, res , () => {
            
            console.log('User authenticated:', req.user);

            res.continue();

          });
        },
      },
    },
    {
      // Route pour le service compte
      prefix: '/accounts/*',
      target: 'http://localhost:3005',
      hooks: {
        onRequest: async (req, res) => {
          
        },
      },
    },
    {
      // Route pour le service transaction
      prefix: '/transactions/*',
      target: 'http://localhost:3006',
      hooks: {
        onRequest: async (req, res) => {
        },
      },
    },

    ],
  });

server.start(port).then(server=> {
    console.log('Gateway is running ' + port)
})


module.exports = server;