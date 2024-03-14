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


let LoginToken;
// login controller
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const match = await comparePassword(password, user.password)
            if (match) {
                // create token
                // jwt.sign({ email: user.email, id: user._id, username: user.username }, process.env.JWT_SECRET, {},
                //     (err, token) => {
                //         if (err) {
                //             console.error("Error creating token:", err);
                //             return res.status(500).json({ error: "Internal server error" });
                //         }
                //         globalToken = token;
                //         // Set the token in a cookie
                //         res.cookie('jwt-token', token);
                //         // Send a single response with token and message
                //         res.json({ message: 'Login successful', token });
                //     });
                res.json({ message: 'login succesfull' })
            } else {
                res.json({ error: 'Password is incorrect' });
            }
        } else {
            res.json({ error: 'User not found' });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.json({ error: 'Internal server error' });
    }
}




//this code is use to get profile
// const getProfile = (req, res) => {
//     const token = LoginToken;
//     res.json(token);
//     // res.json({ message: 'this is a token', token });
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
//             if (err) {
//                 console.error("Error verifying token:", err);
//                 return res.status(401).json({ error: "Unauthorized" });
//             }
//             res.json(user);
//         });
//         console.log("verify");
//     } else {
//         res.json(null);
//         console.log("nullllll");
//     }
// };
// const getProfile = (req, res) => {
//     const { token } = req.cookies['jwt-token'];
//     try {
//         // Some logic to get the user's profile
//         const profileData = {
//             message: 'this is a token'
//         };
//         res.status(200).json(profileData); // Send response with status and JSON data
//     } catch (error) {
//         console.error("Error getting profile:", error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

module.exports = { userRagister, userLogin };