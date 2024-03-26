const User = require("../model/userModel");
const { securePassword, comparePassword } = require('../helper/auth')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')




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
                const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);   // process.env.JWT_SECRET is the secret key and this is a defind in .env file in your peoject
                res.status(200).json({ message: 'login succesfull', token: token, user: user })
                // console.log(user)
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
    const { id, firstname, lastname, username, email, password } = req.user.user;
    // console.log(req.user.user);
    // console.log(id, firstname, lastname, username, email, password);
    res.json({ id, firstname, lastname, username, email, password, message: 'Profile Page' });
};








//this code is change password
const changePassword = async (req, res) => {
    const { old_password, new_password, new_confirmpassword } = req.body;
    // console.log('req.body', req.body)
    const { id, password } = req.user.user;
    // console.log('req.user.user', req.user.user)

    if (new_password !== new_confirmpassword) {
        return res.status(401).json({ error: 'New password and confirm password do not match' });
    }
    const match = await comparePassword(old_password, password)
    // console.log("match", match)
    if (match) {
        const spassword = await securePassword(new_password);
        User.findOneAndUpdate(
            { _id: id },
            { password: spassword },
            { new: true }
        )
            .then(updatedUser => {
                if (!updatedUser) {
                    return res.status(400).json({ error: 'Invalid old password' });
                }
                res.status(200).json({ message: "Password updated successfully" });
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    } else {
        res.status(400).json({ message: 'Old password does not match' });
    }
};








//this code is the send email in forgot password
const sendotp = async (req, res) => {
    const { email } = req.body;
    // console.log('email', email)
    try {
        const user = await User.findOne({ email: email });
        console.log('user', user)
        if (user) {
            // console.log('Email exists')
            let otp = Math.floor(Math.random() * 999991 + 111111);
            // console.log('otp', otp)
            const transporter = nodemailer.createTransport({
                // this host and port ans auth is all detail provied bt smtp server do first creat this server after try this code 
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USERNAME, // this email is defiend in .env file
                    pass: process.env.PASSWORD,   // this password is defiend in .env file
                },
            });
            var mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: "Your OTP for Reset Password",
                text: `Your One Time Password is ${otp}`,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.json({ message: 'otp is not send', error: error })
                } else {
                    res.status(200).json({ message: `otp send ${email}`, info })
                }
            });
            User.findOneAndUpdate(
                { email: email },
                { $set: { otpCode: otp.toString() } },
                { new: true }
            )
                .then(updatedUser => {
                    if (updatedUser) {
                        res.status(200).json({ message: 'OTP has been set successfully:', updatedUser });
                    } else {
                        res.status(404).json({ error: 'User not found.' });
                    }
                })
                .catch(error => {
                    res.status(401).json({ error: 'Error setting OTP ' });
                });
        } else {
            return res.status(404).json({ error: 'the email is not registered with us' })
        }
    } catch (error) {
        res.status(500).json({ error: 'the server encountered an error' })
    }
}









//this code is the verified forgot password otp
const verifiedOtp = async (req, res) => {
    const { otp, email } = req.body
    if (!email) {
        return res.status(400).json({ error: "email not verified please retry" })
    }
    if (!otp) {
        return res.status(400).json({ error: "please provide otp" })
    }
    try {
        const user = await User.findOne({ email: email })
        // console.log("otp match  ----111", user)1
        if (user) {
            if (user.otpCode == otp) {
                res.status(200).json({ message: "OTP matched" })
                console.log('otp is match')
            } else {
                res.status(401).json({ error: 'the otp is not match !' })
            }
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ error: 'this otp is not verified' })
    }
}







const resetPassword = async (req, res) => {
    // console.log(req.body)
    const { email, new_password, new_confirmpassword } = req.body;
    try {
        const match = await User.findOne({ email: email })
        if (match) {
            if (new_password === new_confirmpassword) {
                const spassword = await securePassword(new_password);
                await User.findOneAndUpdate(
                    { email: email },
                    { $set: { password: spassword.toString() } },
                    { new: true }
                )
                res.status(200).json({ message: "successfully updated the password!" });
            } else {
                res.status(400).json({ error: 'confirmpassword is not match' })
            }
        } else {
            res.status(404).json({ error: 'this email is not register' })
        }
    } catch (error) {
        console.log('Error in Reset Password : ', error);
        return res.status(500).json({ error: 'Server Error!' });
    }
}





module.exports = { userRagister, userLogin, getProfile, changePassword, sendotp, verifiedOtp, resetPassword };