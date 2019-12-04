var express = require('express')
var router = express.Router()
var logger = require('../../logger');
let mongoose = require('mongoose');
let Todo = require('../models/todos');
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
	app.use('/api', router);

	router.route('/todos').get(requireAuth,(req, res, next) => {
		logger.log('info', 'Get all todos');
        var query = Todo.find()
        .sort(req.query.order)
        .exec()
        .then(result => {
            if(result && result.length) {
            res.status(200).json(result);
        } else {
            res.status(404).json({message: "No todos"});
        }
        })
        .catch(err => {
          return next(err);
        });
    });

	router.route('/todos').post((req, res, next) => {
		logger.log('info','Create Todo');

		console.log("are fields here???? ", req.body);
		var todo = new Todo(req.body);
		todo.save()
		.then(result => {
			res.status(201).json(result);
		})
		.catch(err => {
		   return next(err);
		});
	  })

	router.route('/todos/:id').get((req, res, next) => {
		logger.log('info', 'Get todo %s', req.params.id);
        Todo.findById(req.params.id)
            .populate("userId")
            .then(todo => {
                if (todo) {
                    res.status(200).json(todo);
                } else {
                    res.status(404).json({ message: "No todo found" });
                }
            })
            .catch(error => {
                return next(error);
            });
	});
	
	router.route('/todos/:id').put((req, res, next) => {
        logger.log('info', 'Get todo %s', req.params.id);
        Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(todo => {
                res.status(200).json(todo);
            })
            .catch(error => {
                return next(error);
            });
	});
	
	router.route('/todos/:id').delete((req, res, next) => {
        logger.log('info', 'Delete todo ' + req.params.id);
        Todo.remove({ _id: req.params.id })
            .then(todo => {
                res.status(200).json({ msg: "Todo Deleted" });
            })
            .catch(error => {
                return next(error);
            });
    })

};

