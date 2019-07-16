var Token = require('./token');

var saveToken = function(token, client, user){
  console.log('[saveToken] Saving token.....');
  var accessToken = new Token({
    accessToken:token.accessToken,
    accessTokenExpiresAt:token.accessTokenExpiresAt,
    client:client,
    clientId:client.clientId,
    user:user,
    userId:user.userId,
    refreshToken:token.refreshToken,
    refreshTokenExpiresAt:token.refreshTokenExpiresAt,
    scope:token.scope,
  });
  accessToken.save(function(err){
    if(err) return err;
  });
  return new Promise(resolve =>{
    resolve(accessToken);
  });
}

var getAccessToken = function(accessToken){
  console.log('[getAccessToken] Getting token.....');
  var token = Token.findOne({accessToken:accessToken});
  return new Promise(resolve => {
    resolve(token);
  });
}

var revokeToken = function(token){
  console.log('[revokeToken] Revoking token.....');
  Token.deleteOne({accessToken:token.accessToken},function(err){
    if(err) return err;
  });
  return new Promise(resolve => {
    resolve(true);
  });
}

var getRefreshToken = function(refreshToken){
  console.log('[getRefreshToken] Getting refreshtoken.....');
  var retoken = Token.findOne({refreshToken:refreshToken});
  return new Promise(resolve => {
    resolve(retoken);
  });
}

module.exports = {
  saveToken:saveToken,
  getAccessToken:getAccessToken,
  revokeToken:revokeToken,
  getRefreshToken:getRefreshToken,
};
