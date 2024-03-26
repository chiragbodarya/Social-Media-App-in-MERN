const mongoose = require('mongoose');

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
    profileImage: String,
    follow_list: [],
    follower_list: [],
    // like_post_list: [{
    //     post_by: {
    //         type: String
    //     },
    // }],
    // comment_list: [{
    //     comment_by: {
    //         name: String,
    //         require: true
    //     }
    // }],
    // is_login: {
    //     default: 1, //0 for not login and 1 for logged in user.
    // }
})



const User = mongoose.model('User', userSchema);

module.exports = User;