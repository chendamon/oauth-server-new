var oauthServer = require('express-oauth-server');
var models = require('../models/oauth');
var Token = require('../models/token');

var server = new oauthServer({
  model:models,
  grants:['authorization_code','refresh_token'],
  accessTokenLifetime:60 * 60,//1 hour
  refreshTokenLifetime:60 * 60 * 24,//1 day
  authorizationCodeLifetime:60 * 5,//5 mins
  alwaysIssueNewRefreshToken:true,
  allowEmptyState:true,
  allowBearerTokensInQueryString:true,
});

var authorization = function(req,res){
  console.log('[oauth2Server.authorization] authorizing client:',req.session.client.clientId,',user:',req.session.user.userId);
  res.render('dialog',{
    client:req.session.client,
    user:req.session.user,
    redirect_uri:req.session.redirect_uri,
    response_type:req.session.response_type,
    state:req.session.query_state,
  });
}
//修改req.body以满足handler的要求
var authorize_pre = function(req,res,next){
  if(req.body.allowed === '同意'){
    req.body.allowed = 'true';
  }else{
    req.body.allowed = 'false';
  }
  next();
}

var userinfo = function(req,res){
  console.log(req.headers.authorization.split(' ')[1]);
  Token.findOne({accessToken:req.headers.authorization.split(' ')[1]},(err,token)=>{
    if(err) {res.json(err); return;}
    res.json({identifier:token.user.userId,displayName:token.user.username,Quota:'10'});
  });
  // var user = req.session.user;
  // res.json({identifier:user.userId,displayName:user.username,Quota:'10'});
}
module.exports = {
  server:server,
  authorization:authorization,
  authorize_pre:authorize_pre,
  userinfo:userinfo,
};
