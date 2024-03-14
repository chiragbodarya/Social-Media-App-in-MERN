const { check, validationResult } = require('express-validator')

const validatorUserRagister = [
    check('firstname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('First Name is required')
        .isLength({ min: 3, max: 15 })
        .withMessage('Name must be within # to !5 character !'),
    check('lastname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Last Name is required')
        .isLength({ min: 3, max: 15 })
        .withMessage('Name must be within # to !5 character !'),
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('User Name is required')
        .isLength({ min: 3, max: 15 })
        .withMessage('Name must be within # to !5 character !'),
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('invalid email'),
    check('password', 'The password must be 5+ chars long and contain a number')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('at least one digit required'),
    check('confirmpassword')
        .custom((value, { req }) => value === req.body.password).withMessage("The passwords do not match"),
]

const userValidation = (req, res, next) => {
    const result = validationResult(req).array()
    // console.log(result);
    // return (
    //     res.json(result)
    // )
    if (!result.length) return next();

    const error = result[0].msg;
    res.json({ success: false, message: error })
}

module.exports = { validatorUserRagister, userValidation };