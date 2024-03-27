const multer = require('multer');
const User = require('../model/userModel');

// upadte Profile
const updateProfile = async (req, res) => {
    // console.log('API is called');
    try {
        const userId = req.params.id; // Use req.params.id instead of req.params.Id
        // console.log('userId', userId);

        const user = await User.findById(userId);
        // console.log('user', user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { firstname, lastname, username, email, aboutUs } = req.body;
        // console.log('req.body', req.body);

        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
        user.email = email;
        user.aboutUs = aboutUs;

        if (req.file) {
            const profileImg = req.file.path;
            user.profileImg = profileImg;
            // console.log(profileImg)
        }

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// follow User
const followUser = async (req, res) => {

    try {
        await User.findByIdAndUpdate(res.body.followId, {
            $push: { followers: req.user._id }
        }, {
            new: true
        }, async (err, result) => {
            console.log("result", result);
            if (err) {
                return res.status(400).json({
                    error: "Could not add to followers"
                })
            }
            await User.findByIdAndUpdate(req.user._id, {
                $push: { following: result.body._id }
            }, {
                new: true
            }).then((user) => {
                res.status(200).json("user", user);
            }).catch(error => { return res.status(404).json({ error: error }) });
        })
    } catch (error) {
        console.log("error in the middleware", error);
        return res.status(400).json({ error: "Follow failed!" });
    }
}


//unfollow User
// const unFollowUser = async () => {

//     try {
//         await User.findByIdAndUpdate(res.body.followId, {
//             $pull: { followers: req.user._id }
//         }, {
//             new: true
//         }, async (err, result) => {
//             console.log("result", result);
//             if (err) {
//                 return res.status(400).json({
//                     error: "Could not add to followers"
//                 })
//             }
//             await User.findByIdAndUpdate(req.user._id, {
//                 $pull: { following: result.body._id }
//             }, {
//                 new: true
//             }).then((user) => {
//                 res.status(200).json("user", user);
//             }).catch(error => { return res.status(404).json({ error: error }) });
//         })
//     } catch (error) {
//         console.log("error in the middleware", error);
//         return res.status(400).json({ error: "UnFollow failed!" });
//     }
// }

module.exports = { updateProfile, followUser };
