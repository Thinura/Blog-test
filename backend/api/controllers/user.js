require('dotenv').config();
const { JWT_KEY } = process.env;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.user_login = (req, res, next) => {
    const email = req.body.email;
    User.find({ email: email })
        .exec()
        .then(user => {
            if (user < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed."
                        });
                    } else if (result) {
                        const authToken = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, JWT_KEY, { expiresIn: "1h" });
                        return res.status(200).json({
                            message: "Auth successful",
                            authToken: authToken,
                            username: user[0].email
                        });
                    } else if (req.body.password == user[0].password) {
                        const authToken = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, JWT_KEY, { expiresIn: "1h" });
                        return res.status(200).json({
                            message: "Auth successful",
                            authToken: authToken,
                            username: user[0].email
                        });
                    } else {
                        return res.status(401).json({
                            message: "Auth failed."
                        });
                    }
                });
            }

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
};

exports.user_signup = (req, res, next) => {
    const email = req.body.email;
    User
        .find({ email: email })
        .exec()
        .then((resultFind) => {
            if (resultFind.length == 0) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        console.log(hash)
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name.toLowerCase(),
                            email: req.body.email,
                            password: hash
                        });

                        user
                            .save()
                            .then(result => {
                                console.log("User added to the database ", result);
                                res.status(201).json({
                                    message: "User created",
                                    createdUser: {
                                        name: result.name,
                                        email: result.email,
                                        password: result.password
                                    }
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({
                                    error: error
                                });
                            });
                    }
                });

            } else {
                console.log("Already in the database ", resultFind);
                res.status(204).json({
                    count: 1,
                    message: "Email has being used."
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
};

exports.user_get_useremail = (req, res, next) => {
    const email = req.params.useremail;
    User
        .findOne({ email: email })
        .exec()
        .then((result) => {
            console.log("From Database ", result);
            if (result == null) {
                res.status(204).json({
                    count: 0,
                    message: "There is no user for this email :" + email + "."
                });
            } else {
                res.status(200).json({
                    count: 1,
                    message: "Details for " + email,
                    user: {
                        name: result.name,
                        email: result.email,
                        password: result.password
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
};

exports.user_update = (req, res, next) => {

    const email = req.params.useremail;

    const updateOps = {};
    for (const ops of req.body) {

        updateOps[ops.propName] = ops.value;
    }

    User.findOne({
        email: email
    })
        .exec()
        .then((result) => {
            console.log("From database", result);
            if (result != null) {
                User.updateOne({
                    email: email
                }, {
                    $set: updateOps
                })
                    .exec()
                    .then(updateResult => {
                        console.log("Updated details ", updateResult);
                        res.status(200).json({
                            message: "User details has been updated."
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error: error
                        });
                    });
            } else {

                res.status(204).json({
                    count: 0,
                    message: "There is no user for this email " + email + "."
                });
            }
        });
};


exports.user_delete = (req, res, next) => {
    const email = req.params.useremail;
    User
        .deleteOne({ email: email })
        .then((result) => {
            console.log("deletedCount: ", result.deletedCount)
            if (1 == result.deletedCount) {
                console.log("Deleted user ")
                res.status(200).json({
                    message: "Deleted user details."
                });
            } else if (0 == result.deletedCount) {
                console.log("Not in the database ", result);
                res.status(204).json({
                    message: "Can't find the details for this email: " + email + "."
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
};