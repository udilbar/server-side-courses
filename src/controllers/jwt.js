const jwt = require('jsonwebtoken')

const SECRET_KEY = 'jubajuba'

const sign = (payload) => jwt.sign(payload, SECRET_KEY)
const verify = (token) => jwt.verify(token, SECRET_KEY)

module.exports.sign = sign
module.exports.verify = verify
