const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dogs = require('./routes/dogs')
const temperament = require('./routes/temperament');
const dog = require('./routes/dog');

require('./db.js');

const server = express();

server.name = 'API';

<<<<<<< HEAD
// server.use(express.urlencoded());
=======
server.use(express.urlencoded({ extended: true}));
>>>>>>> 38ea3adc94ba1feef65fcb3145c71c504c979c7e
server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
<<<<<<< HEAD
  res.header('Access-Control-Allow-Origin', '*');
=======
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
>>>>>>> 38ea3adc94ba1feef65fcb3145c71c504c979c7e
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/dogs', dogs);
server.use('/temperament', temperament);
server.use('/dog', dog);

<<<<<<< HEAD

// Error catching endware.
server.use((err, req, res, next) => { 
=======
server.use((err, req, res, next) => {
>>>>>>> 38ea3adc94ba1feef65fcb3145c71c504c979c7e
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
