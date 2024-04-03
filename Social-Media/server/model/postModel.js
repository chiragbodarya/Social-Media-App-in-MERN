const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    aboutpost: { type: String },
    postimage: { type: String, required: true },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post;