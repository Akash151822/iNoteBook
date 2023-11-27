// database Connectivity
const mongoose = require('mongoose')
require('dotenv').config()
async function connectMongo() {
    mongoose.connect(process.env.mongoUrl).then(() => { console.log("Mongodb connected successfullly") })

}

module.exports = connectMongo