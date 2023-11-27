const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
    try {
        const token =  req.header('auth-token')
        if (!token) {
            return res.status(401).json({ message: "Please authenticate using valid token" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRERT_KEY)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        res.send({ message:"Invalid token Authentication Failed" })

    }
}