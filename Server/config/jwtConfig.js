const ExtractJwt = require("passport-jwt").ExtractJwt;
const secret = require("./secret");

module.exports = {
  //define a secret key for signing the jwt tokens
  secretOrKey: secret.secretKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
