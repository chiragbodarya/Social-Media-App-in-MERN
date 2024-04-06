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
    console.log('followUser API is called');
    const searchUserId = req.params.id;
    const loggedInUserId = req.user.user.id;
    // console.log(`Searched user id: ${searchUserId}`);
    // console.log(`Logged-in user id: ${loggedInUserId}`);

    try {
        const existFollowing = await User.findOne({ _id: loggedInUserId, following: { $in: [searchUserId] } }, "followers");
        const existFollowers = await User.findOne({ _id: searchUserId, followers: { $in: [loggedInUserId] } }, "following");
        // console.log('existFollowers', existFollowers)
        // console.log('existFollowing', existFollowing)

        if (existFollowers || existFollowing) {
            res.status(401).json({ error: "You have already followed this user" });
            return existFollowers;
        } else {
            try {
                const updatedLoggedInUser = await User.findByIdAndUpdate(
                    loggedInUserId,
                    { $push: { following: searchUserId } },
                    { new: true }
                );
                // console.log('updatedLoggedInUser', updatedLoggedInUser);

                const updatedFollowedUser = await User.findByIdAndUpdate(
                    searchUserId,
                    { $push: { followers: loggedInUserId } },
                    { new: true }
                );
                // console.log('updatedFollowedUser', updatedFollowedUser);
                // res.status(200).json({ message: "User unfollowed successfully", updatedLoggedInUser, updatedFollowedUser, existFollowers });
                res.status(200).json({ message: "User unfollowed successfully", existFollowers });
            } catch (error) {
                console.error('Error in the unfollowUser middleware:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    } catch (error) {
        console.error('Error in the followUser middleware:', error);
        res.status(404).json({ error: 'Follow failed!' });
    }
};




const CheckFollowStatus = async (req, res) => {
    // console.log('api is call for checkfollowstatus')
    const loggedInUserId = req.user.user.id;
    const searchUserId = req.params.userId;

    try {
        const user = await User.findById(loggedInUserId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isFollowed = user.following.includes(searchUserId);
        console.log('isFollowed', isFollowed)
        res.json({ isFollowed });
    } catch (error) {
        console.error("Error checking follow status:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




// unfollow User
const unfollowUser = async (req, res) => {
    // console.log('unfollowUser API is called');
    const searchUserId = req.params.id;
    const loggedInUserId = req.user.user.id;
    // console.log(`Searched user id: ${searchUserId}`);
    // console.log(`Logged-in user id: ${loggedInUserId}`);

    try {
        const existFollowing = await User.findOne({ _id: loggedInUserId, following: { $in: [searchUserId] } }, "followers");
        const existFollowers = await User.findOne({ _id: searchUserId, followers: { $in: [loggedInUserId] } }, "following");
        // console.log('existFollowers', existFollowers)
        // console.log('existFollowing', existFollowing)

        if (existFollowers || existFollowing) {
            try {
                const updatedLoggedInUser = await User.findByIdAndUpdate(
                    loggedInUserId,
                    { $pull: { following: searchUserId } },
                    { new: true }
                );
                // console.log('updatedLoggedInUser', updatedLoggedInUser);

                const updatedFollowedUser = await User.findByIdAndUpdate(
                    searchUserId,
                    { $pull: { followers: loggedInUserId } },
                    { new: true }
                );
                // console.log('updatedFollowedUser', updatedFollowedUser); 
                // res.status(200).json({ message: "User followed successfully", updatedLoggedInUser, updatedFollowedUser, existFollowers });
                res.status(200).json({ message: "User unfollowed successfully", existFollowers });
            } catch (error) {
                console.error('Error following user:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            res.status(401).json({ error: "First Follow this user" });
            return existFollowers;
        }
    } catch (error) {
        console.error('Error in the followUser middleware:', error);
        res.status(404).json({ error: 'Follow failed!' });
    }
};

module.exports = { updateProfile, followUser, CheckFollowStatus, unfollowUser };