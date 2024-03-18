const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

const { validatorUserRagister, userValidation } = require('../middleware/validation/user');
const { verifyToken } = require('../middleware/verifyToken');


// this is your router 
router.post('/registration', validatorUserRagister, userValidation, authController.userRagister);

router.post('/', authController.userLogin)
router.post('/login', authController.userLogin)

router.get('/profile', verifyToken, authController.getProfile)

router.post('/change-password', authController.changePassword)

module.exports = router;