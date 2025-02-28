const {access, refresh} = require("./jwtConfig");


const cookiesConfig = {
    refresh: 'refresh',
    access: 'access',
    httpOnly: true,
    maxAgeAccess: access.expiresIn,
    maxAgeRefresh: refresh.expiresIn
}

module.exports = cookiesConfig;