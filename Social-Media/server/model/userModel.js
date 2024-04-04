const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    otpCode: {
        type: String,
        required: false,
    },
    profileImg: {
        type: String
    },
    aboutUs: {
        type: String
    },
    posts: [{ type: ObjectId, ref: "Post" }],
    followers: [{ type: ObjectId, red: "User" }],
    following: [{ type: ObjectId, red: "User" }],
})


const User = mongoose.model('User', userSchema);

module.exports = User;