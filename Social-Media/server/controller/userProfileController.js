const User = require('../model/userModel');

const userProfileController = async (req, res) => {
    // console.log('userProfileController api is called')
    const userId = req.params.id;
    // console.log(userId + ' is the id of the user');
    // console.log('userId', userId)
    try {
        const user = await User.find({ _id: userId });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error, message: 'server error' });
    }
}

module.exports = { userProfileController };