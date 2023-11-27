const express = require('express')
const router = express.Router()
const { validateUser, handleValidationErrors } = require('../Middleware/validation')
const UserController = require('../controllers/userController')
const Authentication=require('../Middleware/authentication')

router.get('/', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

router.post('/add', validateUser, handleValidationErrors, UserController.add)
router.post('/login',UserController.login)
router.get('/getUser',Authentication,UserController.getUser)
module.exports = router