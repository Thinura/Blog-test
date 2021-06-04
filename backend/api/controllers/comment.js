const mongoose = require('mongoose');
const Post = require('../models/post');
const Comment = require('../models/comment');

exports.createComment = (req, res, next) => {
    const postId = req.params.postId;
    const comment = req.body.comment;
    Post.findOne({
        _id: postId
    })
        .exec()
        .then((result) => {
            if (result != null) {
                const newComment = new Comment({
                    _id: new mongoose.Types.ObjectId(),
                    postId: postId,
                    comment: comment
                });

                newComment
                    .save()
                    .then(() => {
                        console.log("Created a comment.");

                        Comment
                            .find({ postId: postId })
                            .exec()
                            .then((value) => {
                                console.log(value)
                                const response = {
                                    id: result.id,
                                    title: result.title,
                                    description: result.description,
                                    titleColor: result.titleColor,
                                    comments: {
                                        count: value.length,
                                        comment: value
                                    }
                                }
                                res.status(201).json({
                                    message: "Details for post id " + postId,
                                    response: response
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({
                                    error: error
                                });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error: error
                        });
                    });
            } else {
                res.status(404).json({
                    count: 0,
                    message: "There is no post for this id " + id + "."
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

exports.getCommentByPostId = (req, res, next) => {
    const id = req.params.postId;
    Post.findOne({
        _id: id
    })
        .exec()
        .then((result) => {
            console.log("From Post ", result);
            if (result == null) {
                res.status(404).json({
                    count: 0,
                    message: "There is no post for this post :" + id + "."
                });
            } else {
                Comment
                    .find({ postId: id })
                    .exec()
                    .then((value) => {
                        console.log(value)
                        const response = {
                            id: result.id,
                            title: result.title,
                            description: result.description,
                            titleColor: result.titleColor,
                            comments: {
                                count: value.length,
                                comment: value
                            }
                        }
                        res.status(201).json({
                            message: "Details for post id " + id,
                            response: response
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error: error
                        });
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