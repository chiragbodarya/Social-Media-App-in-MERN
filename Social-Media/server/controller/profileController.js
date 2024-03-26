const User = require('../model/userModel');

const updateProfile = async (req, res) => {
    console.log('api is colled')
    try {
        const userId = req.params.Id;
        console.log('userId', userId);
        const user = await User.findById(userId);
        console.log('user', user)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { firstname, lastname, username, email } = req.body;
        console.log('req.body', req.body)
        // Update user profile
        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
        user.email = email;
        if (req.file) {
            const profileImg = req.file.path; // Assuming multer middleware is used for file upload
            user.profileImg = profileImg;
        }
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });

        // const { UserId, firstname, lastname, username, email, profileImage } = req.body;
        // console.log(req.body)
        // const updatedUser = await User.findByIdAndUpdate(UserId, {
        //     firstname,
        //     lastname,
        //     username,
        //     email,
        //     profileImage
        // }, { new: true });
        // if (updatedUser) {
        //     return res.status(200).json({ message: "Profile has been successfully updated!", updatedUser });
        // } else {
        //     return res.status(404).json({ message: "No user found with the given ID." })
        // }
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { updateProfile }