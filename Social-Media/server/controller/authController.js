const User = require("../model/userModel");
const { securePassword, comparePassword } = require('../helper/auth')
const jwt = require('jsonwebtoken');



//register controller
const userRagister = async (req, res) => {
    try {

        // this code is collect the data
        const { firstname, lastname, username, email, password, confirmpassword } =
            req.body;

        const spassword = await securePassword(password);

        // this code is check the user is already register
        const exist = await User.findOne({ email: email });
        // console.log('existuser', exist)
        if (exist !== null) {
            return res.json({
                error: 'this email is already register ! change email'
            })
        }

        // this code is creact the model how to store the data in witch forment
        const newUser = new User({
            email,
            firstname,
            lastname,
            password: spassword,
            username
        })

        //this code is store the data in mongodb
        await newUser.save()

        // this code is return the result in postmen
        return res.json(newUser)
    } catch (error) {
        console.log(error.message, 'error in controller');
    }
};


// login controller
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        // req.send(user)
        if (user) {
            const match = await comparePassword(password, user.password)
            if (match) {
                // Generate JWT token
                const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
                res.status(200).json({ message: 'login succesfull', token: token, user: user })
                console.log(user)
            } else {
                res.status(401).json({ error: 'Password is incorrect' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}



//this code is use to get profile
const getProfile = (req, res) => {
    // Extract user information from JWT token
    const { id, firstname, lastname, username, email, password } = req.user;
    console.log(req.user)
    // You can use the extracted user information to personalize the profile page
    res.json({ id, username, message: 'Profile Page' });
};


//this code is change password
const changePassword = (req, res) => {
    const token =
}

module.exports = { userRagister, userLogin, getProfile, changePassword };