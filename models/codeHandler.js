var Code = require('./code');
var sleep = require('sleep');

var saveAuthorizationCode = async function (authorizationCode, client, user){
  console.log('[saveAuthorizationCode] Saving authCode.....',authorizationCode.authorizationCode);
  var s_code = new Code({
    authorizationCode:authorizationCode.authorizationCode,
    expiresAt:authorizationCode.expiresAt,
    client:client,
    user:user,
    redirectUri:authorizationCode.redirectUri,
  });
  await s_code.save((err)=>{
    if(err) return err;
  });
  sleep.msleep(500);
  return new Promise(resolve => {
    resolve(s_code);
  });

}
var getAuthorizationCode = async function(authorizationCode){
  console.log('[getAuthorizationCode] Getting authCode.....',authorizationCode);
  var authcode = await Code.findOne({authorizationCode:authorizationCode});
  console.log('[getAuthorizationCode] get authCode.....',authcode);
  return new Promise(resolve => {
      resolve(authcode);
  });
}
var revokeAuthorizationCode = async function(code){
  console.log('[revokeAuthorizationCode] Revoking authCode.....',code.authorizationCode);
  await Code.deleteOne({authorizationCode:code.authorizationCode},(err)=>{
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
