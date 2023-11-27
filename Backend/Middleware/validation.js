const { body, validationResult } = require('express-validator')

const validateUser = [
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a password with a minimum length of 8 characters').isLength({ min: 8 }),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}
module.exports = {
    validateUser, handleValidationErrors
}
