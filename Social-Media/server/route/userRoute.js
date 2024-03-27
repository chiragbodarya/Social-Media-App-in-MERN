const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const profileController = require('../controller/profileController');
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

//follow user
router.put("/follow", verifyToken, profileController.followUser);

// Unfollow user
// router.put("/Unfollow", verifyToken, profileController.unFollowUser);


module.exports = router;