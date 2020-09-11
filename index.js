const express = require('express')
const configureDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')
const app = express() 

const port = 5000

app.use(cors())

configureDB()
app.use(express.json())
app.use(router)
//app.use(cors())

app.listen(port, () => {
    console.log('server running on port', port)
})