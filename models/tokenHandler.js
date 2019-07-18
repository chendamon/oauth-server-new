var Token = require('./token');

var saveToken = async function(token, client, user){
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
  await accessToken.save(function(err){
    if(err) return err;
  });
  return new Promise(resolve =>{
    resolve(accessToken);
  });
}

var getAccessToken = async function(accessToken){
  console.log('[getAccessToken] Getting token.....');
  var token = await Token.findOne({accessToken:accessToken});
  return new Promise(resolve => {
    resolve(token);
  });
}

var revokeToken = async function(token){
  console.log('[revokeToken] Revoking token.....');
  await Token.deleteOne({accessToken:token.accessToken},function(err){
    if(err) return err;
  });
  return new Promise(resolve => {
    resolve(true);
  });
}

var getRefreshToken = async function(refreshToken){
  console.log('[getRefreshToken] Getting refreshtoken.....');
  var retoken = await Token.findOne({refreshToken:refreshToken});
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
