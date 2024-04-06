const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    postImage: {
        type: String,
        required: true
    },
    aboutpost: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    date: { type: Date, default: Date.now },
    likes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            text: {
                type: String,
            },
            user: {
                type: ObjectId,
                ref: 'User'
            },
            likes: [
                {
                    type: ObjectId,
                    ref: 'User'
                }
            ],
            replies: [
                {
                    text: {
                        type: String,
                    },
                    user: {
                        type: ObjectId,
                        ref: 'User'
                    },
                    likes: [
                        {
                            type: ObjectId,
                            ref: 'User'
                        }
                    ]
                }
            ]
        }
    ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;