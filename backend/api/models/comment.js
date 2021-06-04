const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;