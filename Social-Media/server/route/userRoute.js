const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

const { validatorUserRagister, userValidation } = require('../middleware/validation/user')


// this is your router 
router.post('/registration', validatorUserRagister, userValidation, authController.userRagister);

// router.post('/', authController.userLogin)
router.post('/login', authController.userLogin)

// router.get('/profile', authController.getProfile)

module.exports = router;