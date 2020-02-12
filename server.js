const express = require('express'); // importing a CommonJS module
const morgan = require("morgan");
const helmet = require("helmet");

const hubsRouter = require('./hubs/hubs-router.js');
const server = express();

// the three amigas: rachel, rita, nancy
function logger(req, res, next) {
  console.log(`request to ${req.method} and ${req.originalUrl}`)
  next();
}

function greeter(req, res, next) {
  req.cohort = 'web26';
  next();
}
//password
function gatekeeper(guess){
  
  return function (req, res, next) {
    const password = req.headers.password;
    if (password && password.toLowerCase() === guess) {
      next();
    } else {
      res.status(401).json({errorMessage: 'no way jose'})
    }
  }
}

//example of using fetch with axios
// function fetchHubs(req, res, next) {
//   const endpoint = 'https://lotr.com/hubs';
//   const options = {
//     headers: {
//       password: "mellon"
//     }
//   }
//   axios.get(endpoint, options).then().catch()
// }

//global middleware
server.use(express.json()); //built in middleware
// server.use(morgan('dev'));
server.use(helmet());
// server.use(logger);

// routes- endpoints
server.use('/api/hubs', logger, gatekeeper("mellon"), hubsRouter);


server.get("/", logger, greeter, gatekeeper("apple"), (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.cohort} to the Lambda Hubs API</p>
    `);
});

//write a gatekeeper middleware that reads a password from req.headers
//if the password is "mellon" let the request continue
//if the password is not "mellon" send a 400 status code and a message to the client

module.exports = server;
