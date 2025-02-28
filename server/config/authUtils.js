require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtConfig = require("./jwtConfig");

const generateTokens = (payload) => ({
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: jwtConfig.access.expiresIn
        }),
    refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: jwtConfig.access.expiresIn
    })
})

module.exports = generateTokens;