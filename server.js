const express = require('express'); // importing a CommonJS module
const morgan = require("morgan");
const helmet = require("helmet");

const hubsRouter = require('./hubs/hubs-router.js');
const server = express();

// the three amigas: rachel, rita, nancy
function logger(req, res, next) {

}

//middleware
server.use(express.json()); //built in middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(logger());
// routes- endpoints
server.use('/api/hubs', hubsRouter);
server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
