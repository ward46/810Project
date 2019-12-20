var express = require('express');
let mongoose = require('mongoose');
var users = require('./app/controllers/users');
const bodyParser = require('body-parser');
const morgan=require("morgan");
const logger = require("./logger");
const fs= require('fs');
const cors = require('cors');

module.exports = function (app, config) {
  app.use(cors({origin: 'http://localhost:9000'}));
  let Todos = require('./app/models/todos');
  let User  = require('./app/models/users');
  let TodoController = require('./app/controllers/todos');
  let UserController = require('./app/controllers/users');

  // this wasn't finding the directory, so imported one by one on above
  /**var models = fs.readdirSync('./app/models');
    models.forEach((model) => {
  //     require('../app/models/' + model);
    console.log('this is model',model);
    });
    var controllers = fs.readdirSync('./app/controllers');
    controllers.forEach((controller) => {
  //     contoller = require('../app/controllers/' + controller)(app, config);
    });
  **/

  logger.log('info',"Loading Mongoose functionality");
  mongoose.Promise = require('bluebird');
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });

  app.use(function (err, req, res, next) {
    console.log(err);
    if (process.env.NODE_ENV !== 'test') console.log('error',err.stack);
    res.type('text/plan');
    if(err.status){
      res.status(err.status).send(err.message);
    } else {
      res.status(500).send('500 Sever Error');
    }
  });
  if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
    mongoose.set('debug', true);
    mongoose.connection.once('open', function callback() {
      logger.log('info',"Mongoose connected to the database");
    });

    app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  console.log("config root", config.root + '/public');
  app.use(express.static(config.root + '/public'));
  TodoController(app, config);
  UserController(app, config);
  app.use(function (req, res) {
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Server Error');
  });

  console.log("Starting application");

};
