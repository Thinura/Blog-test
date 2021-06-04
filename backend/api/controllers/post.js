const mongoose = require('mongoose');
const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const titleColor = req.body.titleColor;
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        description: description,
        titleColor: titleColor
    });

    post
        .save()
        .then(result => {
            console.log("Created a post ", result);
            res.status(201).json({
                message: "Post created",
                createdPost: {
                    id: result.id,
                    title: result.title,
                    description: result.description,
                    titleColor: result.titleColor
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
};

exports.getAllPost = (req, res, next) => {
    Post
        .find()
        .exec()
        .then((result) => {
            if (result.length != 0) {
                const response = {
                    post: result.map(
                        post => {
                            return {
                                _id: post._id,
                                title: post.title,
                                description: post.description,
                                titleColor: post.titleColor,
                                comments: post.comments
                            }
                        }
                    )
                };
                res.status(200).json({
                    count: result.length,
                    message: "All post details.",
                    posts: response
                });
            } else {
                res.status(404).json({
                    count: result.length,
                    message: "No posts available."
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

exports.getPostById = (req, res, next) => {
    const id = req.params.postId;
    Post
        .findOne({ _id: id })
        .exec()
        .then((result) => {
            console.log("From Post ", result);
            if (result == null) {
                res.status(404).json({
                    count: 0,
                    message: "There is no post for this post :" + id + "."
                });
            } else {
                res.status(201).json({
                    count: 1,
                    message: "Details for post id " + id,
                    user: result
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



// exports.postUpdate = (req, res, next) => {

// };

// exports.postDelete = (req, res, next) => {

// };


