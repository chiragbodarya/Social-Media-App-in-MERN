const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const profileController = require('../controller/profileController');
const searchUserController = require('../controller/searchUserController');
const userProfileController = require('../controller/userProfileController');
const upload = require('../middleware/multerConfig');


const { validatorUserRagister, userValidation } = require('../middleware/validation/user');
const { verifyToken } = require('../middleware/verifyToken');


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

router.get('/search-user', searchUserController.searchUserProfile)
router.get('/user/:id', userProfileController.userProfileController)

//follow user
// router.post("/follow", verifyToken, profileController.followUser);

// Unfollow user
// router.post("/Unfollow", verifyToken, profileController.unFollowUser);


module.exports = router;