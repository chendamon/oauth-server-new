var Code = require('./code');

var saveAuthorizationCode = function (authorizationCode, client, user){
  console.log('[saveAuthorizationCode] Saving authCode.....');
  var s_code = new Code({
    authorizationCode:authorizationCode.authorizationCode,
    expiresAt:authorizationCode.expiresAt,
    client:client,
    user:user,
    redirectUri:authorizationCode.redirectUri,
  });

  s_code.save(function(err){
    if(err){
      return next(err);
    }
  });

  return new Promise(resolve => {
      resolve(s_code);
    });
}
var getAuthorizationCode = function(authorizationCode){
  console.log('[getAuthorizationCode] Getting authCode.....');
  var authcode = Code.findOne({authorizationCode:authorizationCode});
  return new Promise(resolve => {
      resolve(authcode);
  });
}
var revokeAuthorizationCode = function(code){
  console.log('[revokeAuthorizationCode] Revoking authCode.....',code.authorizationCode);
  Code.deleteOne({authorizationCode:code.authorizationCode},(err)=>{
    if(err) return err;
  });
  return new Promise(resolve => {
    resolve(true);
  });
}

module.exports = {
  saveAuthorizationCode:saveAuthorizationCode,
  getAuthorizationCode:getAuthorizationCode,
  revokeAuthorizationCode:revokeAuthorizationCode,
};
