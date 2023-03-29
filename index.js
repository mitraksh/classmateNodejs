const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
// const expressValidator = require('express-validator')
const router = require('./components')
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware")

app.use(express.json())
app.use(cookieParser())
// app.use(expressValidator);
app.get('/', (req, res) => {
    try {
        res.send('School App')
    } catch (e) {
        res.send(e)
    }
})
  
app.use('/school', router)
app.use(errorHandlerMiddleware)
app.listen(port, () => {try {
    console.log(`Server started at port ${port}`)
} catch (error) {
    console.error(error)
}
})
