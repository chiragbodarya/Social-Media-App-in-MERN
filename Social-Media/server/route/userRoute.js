const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const profileController = require('../controller/profileController');
const searchUserController = require('../controller/searchUserController');
const userProfileController = require('../controller/userProfileController');
const postController = require('../controller/postController');
const upload = require('../middleware/multerConfig');




const { validatorUserRagister, userValidation } = require('../middleware/validation/user');
const { verifyToken } = require('../middleware/verifyToken');
const uploadpost = require('../middleware/postImage');




// this is your router
router.post('/registration', validatorUserRagister, userValidation, authController.userRagister);

router.post('/', authController.userLogin)
router.post('/login', authController.userLogin)

router.get('/profile', verifyToken, authController.getProfile)

router.post('/change-password', verifyToken, authController.changePassword)

router.post('/forgot-password-send-otp', authController.sendotp)

router.post('/forgot-password-verified-otp', authController.verifiedOtp)

router.post('/reset-password', validatorUserRagister, authController.resetPassword)

// update profile
router.put('/update-profile/:id', upload.single('profileImg'), profileController.updateProfile);

//serch other user
router.get('/search-user', searchUserController.searchUserProfile)

//serch user profile
router.get('/user/:id', userProfileController.userProfileController)

//follow user
router.post("/follow/:id", verifyToken, profileController.followUser);

// checkFollowStatus
router.get('/checkfollowstatus/:userId', verifyToken, profileController.CheckFollowStatus);

// Unfollow user
router.post("/unfollow/:id", verifyToken, profileController.unfollowUser);




// Upload Post
router.post('/upload', verifyToken, uploadpost.single('postImage'), postController.uploadPost);

// Get All Posts
router.post('/getallpost/:id', postController.getAllPosts);



// // Delete Post
// router.delete('/:id', postController.deletePost);

// Like Post
router.post('/like/:id', verifyToken, postController.likePost);

// UnLike Post
router.post('/unlike/:id', verifyToken, postController.unLikePost);

// // Comment Post
// router.post('/comment/:id', postController.commentPost);

// // Reply to Comment
// router.post('/comment/:postId/reply/:commentId', postController.replyToComment);

module.exports = router;