const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

const user = require('../middleware/validation/user')

// router.get('/', userController.test)

// this is your router 
router.post('/registration', user.validatorUserRagister, userController.userRagister);

// router.post('/', userController.userLogin)
// router.post('/login', userController.userLogin)



module.exports = router;