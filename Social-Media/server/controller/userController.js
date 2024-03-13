const User = require("../model/userModel");

// login controller
// const userLogin = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email: email });
//         if (user) {
//             if (password === user.password) {
//                 res.send({ message: 'login Successful', user: user })
//             } else {
//                 res.send({ message: 'password is incorrect' });
//             }
//         } else {
//             res.send({ message: 'user not found !' })
//         }
//     } catch (error) {

//     }
// }



//register controller
const userRagister = async (req, res) => {
    try {
        // console.log(req.body)
        const { firstname, lastname, username, email, password, confirmpassword } =
            req.body;
        console.log(firstname, lastname, username, email, password, confirmpassword)

        // const exist = await User.findOne({ email: email });
        // console.log('existuser', exist)
        // if (exist !== null) {
        //     return res.json({
        //         error: 'this email is alreay register ! change email'
        //     })
        // }

        // console.log('firstname :', firstname)
        // if (!firstname || !lastname || !username || !email || !password || !confirmpassword) {
        //     return res.json({
        //         error: "all field is required"
        //     })
        // } else if (firstname.length > 15) {
        //     return res.json({
        //         error: "must be 15 characters or less"
        //     })
        // }

        // if (password !== confirmpassword) {
        //     return res.send('password and confirm-password is not match')
        // }

        const newUser = new User({
            email,
            firstname,
            lastname,
            password,
            username
        })
        // console.log('newuse:', newUser)

        await newUser.save()
        return res.json(newUser)
    } catch (error) {
        console.log(error.message, 'error in controller');
    }
};

const test = (req, res) => {
    return res.send("test is working");
};

module.exports = { userRagister };
// module.exports = { test }
