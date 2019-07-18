var User = require('./userHandler');
var Client = require('./client');
var Code = require('./codeHandler');
var Token = require('./tokenHandler');

module.exports = {
  getUser:User.getUser,
  getClient:Client.getClient,
  //generateAuthorizationCode:Code.generateAuthorizationCode,
  saveAuthorizationCode:Code.saveAuthorizationCode,
  getAuthorizationCode:Code.getAuthorizationCode,
  revokeAuthorizationCode:Code.revokeAuthorizationCode,
  saveToken:Token.saveToken,
  getAccessToken:Token.getAccessToken,
  revokeToken:Token.revokeToken,
  getRefreshToken:Token.getRefreshToken,
};
