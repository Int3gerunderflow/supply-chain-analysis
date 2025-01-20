const jwt = require('jsonwebtoken')

/**
 * Middleware to check if the provided request has the correct token to access this route
 */
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined')
    {
        const bearer = header.split(' ');
        const token = bearer[1]
        req.token = token

        //verify the token 
        jwt.verify(token, process.env.AUTHKEY, (err, data) => {
            if(err)
            {
                res.sendStatus(403)
            }
        })
        next()
    }
    else
    {
        res.sendStatus(403)
    }
}

module.exports = checkToken