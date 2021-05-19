const express = require('express')
const configureDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')
const path = require('path')

const app = express() 



app.use(cors())

configureDB()

app.use(express.json())
app.use(router)
app.use('/uploads', express.static('uploads'))

// serve static assets in production
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

}
const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log('server running on PORT', PORT)
})