const mongoose = require('mongoose')
const config = require('config')
const mongoUri = config.get('mongoURI')

const configureDB = () => {
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = configureDB


