const connectMongo = require('./db')
const express = require('express')
const cors = require('cors')
connectMongo()
const app = express()

app.use(express.json())
app.use(cors())
const authRouter = require('./routes/auth')
const notesRouter = require('./routes/notes')

app.get('/', (req, res) => {
    res.send("Home")
})
app.use('/api/auth', authRouter)
app.use('/api/notes', notesRouter)

app.listen(process.env.PORT, () => {
    console.log(`App listening at port ${process.env.PORT}`)
})