var express = require('express')
var router = express.Router()
var logger = require('../../logger');
let mongoose = require('mongoose');
let User = require('../models/users');

passportService = require('../../passport'),
passport = require('passport');

const requireLogin = passport.authenticate('local', { session: false });




module.exports = function (app, config) {
    app.use('/api', router);
    router.route('/users/login').post(requireLogin, login);
    router.route('/users').get((req, res, next) => {
        logger.log('info', 'Get all users');
        var query = User.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No users" });
                }
            })
            .catch(err => {
                return next(err);
            });
    });



    router.route('/users').post((req, res, next) => {
        logger.log('info', 'Create User');

        console.log("are fields here???? ", req.body);
        var user = new User(req.body);
        user.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                return next(err);
            });
    })

    router.route('/users/:id').get((req, res, next) => {
        logger.log('info', 'Get user %s', req.params.id);
        User.findById(req.params.id)
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ message: "No user found" });
                }
            })
            .catch(error => {
                return next(error);
            });
    });

    router.route('/users/:id').put((req, res, next) => {
        logger.log('info', 'Get user %s', req.params.id);
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(user => {
                res.status(200).json(user);
            })
            .catch(error => {
                return next(error);
            });
    });
    router.put('/users/password/:id', function (req, res, next) {
        logger.log('info', 'Update user ' + req.params.id);
        User.findById(req.params.id)
            .exec()
            .then(function (user) {
                if (req.body.password !== undefined) {
                    user.password = req.body.password;
                }
                user.save()
                    .then(function (user) {
                        res.status(200).json(user);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });

    router.route('/users/:id').delete((req, res, next) => {
        logger.log('info', 'Delete user ' + req.params.id);
        User.remove({ _id: req.params.id })
            .then(user => {
                res.status(200).json({ msg: "User Deleted" });
            })
            .catch(error => {
                return next(error);
            });
    })
    // router.route('/users').get((req, res, next) => {
    // 	logger.log('info', 'Get all users');

    // });

    // router.route('/users').post((req, res, next) => {
    // 	logger.log('info', 'Create user');
    // 	res.status(201).json({ message: 'Created user' });

    // });

    // router.route('/users/:id').get((req, res, next) => {
    // 	logger.log('info', 'Get user %s', req.params.id);
    // 	res.status(200).json({ id: req.params.id });
    // });

    // router.route('/users/login').post((req, res, next) => {
    // 	logger.log('info', '%s logging in', req.body.email);
    // 	var email = req.body.email;
    // 	var password = req.body.password;

    // 	var obj = { 'email': email, 'password': password };
    // 	res.status(201).json(obj);
    // });

};

