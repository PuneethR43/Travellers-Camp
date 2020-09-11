const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    // console.log(req.headers)
    const token = req.headers.authorization
    if(token) {
        let tokenData 
        try {
            tokenData = jwt.verify(token, 'secret123')
            req.userId = tokenData.id 
            next()
        } catch(e) {
            res.status('401').json({ error: e.message })
        }
        
    } else {
        res.status('401').json({ error: 'token not provided'})
    }
   
}

module.exports = {
    authenticateUser
}