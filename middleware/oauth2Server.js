var oauthServer = require('express-oauth-server');
var models = require('../models/oauth');
var Token = require('../models/token');
var config = require('../config');

var server = new oauthServer({
  model:models,
  grants:['authorization_code','refresh_token'],
  accessTokenLifetime:60*60,//1 hour
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
  console.log('[userinfo] app already got user info page ');
  console.log(req.headers.authorization.split(' ')[1]);
  Token.findOne({accessToken:req.headers.authorization.split(' ')[1]},(err,token)=>{
    if(err) {res.json(err); return;}
    //07.24 测试group 增加group sg
    res.json({identifier:token.user.userId,displayName:token.user.username,Quota:'10',Group:'SG'});
  });
}
/*
处理refresh_token，如果请求类型为refreshtoken，直接补全body参数
*/
var token_pre = async function(req,res,next){
  if(req.body.grant_type === 'refresh_token'){
    console.log('refresh_token');
    var token = await Token.findOne({refreshToken:req.body.refresh_token});
    req.body.client_id = token.client.clientId;
    req.body.client_secret = token.client.clientSecret;
  }
  next();
}
/*
处理用户登出操作，直接将session中内容清空，避免出现登录再重复授权的情况；
这样等于是默认用户在登出操作之后已经取消了授权。
*/
var logout = function(req,res){
  var clientId = req.session.client.clientId;

  //删除该用户相关的token
  Token.deleteMany({userId:req.session.user.userId}).then(
    ()=>{
      req.session.user = null;
      req.session.client = null;
      console.log('[logout] user logout');
      res.redirect(config.get(clientId));
    }
  );
}
module.exports = {
  server:server,
  authorization:authorization,
  authorize_pre:authorize_pre,
  userinfo:userinfo,
  token_pre:token_pre,
  logout:logout,
};
