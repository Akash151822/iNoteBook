const User = require('../models/User')
const user = {}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// add User API

user.add = async (req, res) => {
    try {
        let data = req.body
        let success = false
        if (!(data.name || data.email || data.password)) {
            return res.send({ success, error: "Please provide necessary details , E-mail, name and password for successful signUp" })
        }
        let exist = await User.findOne({ email: data.email })
        if (exist) {
            return res.status(400).json({ success, error: " Sorry ! User already exist with this E-mail Id" })
        }
        if (data.password != data.cPassword) {
            return res.status(404).json({ success, error: "Confirm password does not matches the password" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(data.password, salt)
        data.password = hashPass
        let save = await User.create(data)
        if (save) {
            const payload = {
                id: user._id
            }
            const authtoken = jwt.sign(payload, process.env.JWT_SECRERT_KEY)
            success = true
            res.status(200).json({ message: "signup successful", success, authtoken })
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// login user

user.login = async (req, res) => {
    try {
        let success = false
        let data = req.body
        const { email, password } = data
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
        const passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
        const payload = {
            id: user._id
        }
        const authtoken = jwt.sign(payload, process.env.JWT_SECRERT_KEY)
        success = true
        res.status(200).json({ message: "User login successfull", success, authtoken })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }

}

// userDetails

user.getUser = async (req, res) => {
    try {
        let success = false
        let exist = await User.findById(req.user.id).select('-password')
        if (!exist) {
            return res.status(400).json({ success, error: "No such user exists" })
        }
        res.status(200).json({ success, exist })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })

    }
}

module.exports = user