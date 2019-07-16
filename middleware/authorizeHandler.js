var Client  = require('../models/client');
var User = require('../models/user');
var errors = require('../errors');

var verifyAuthorizeQuery = function(req,res,next){
  if(!req.query.response_type || req.query.response_type !== 'code'){
    return next(errors.InvalidRequest('Query response_type is not code!'));
  }else if(!req.query.client_id){
    return next(errors.InvalidRequest('Query should contain clientId!'));
  }else if(!req.query.redirect_uri){
    return next(errors.InvalidRequest('Query should contain redirctUri!'));
  }
  Client.findOne({clientId:req.query.client_id},function(err,client){
    if(err || !client){
      return next(err);
    }
    //07.16 目测这个环节是不需要验证的，后续token有验证
    //需要验证client_secret
    // if(client.clientSecret){
    //   if(!req.query.client_secret || req.query.client_secret !== client.clientSecret)
    //     return next(errors.InvalidRequest('Invalid client!'));
    // }
    //用session记录各种状态
    req.session.redirect_uri = req.query.redirect_uri;
    req.session.response_type = req.query.response_type;
    req.session.query_state = req.query.state;
    req.session.client = client;
    //首先判断用户是否登录
    if(!req.session.user){
      res.render('login',{clientId: client.clientId});
      return;
    }else{
      next();
    }
  });
}
var handleLogin = function(req,res,next){
  console.log('[handleLogin] user login...');
  //req.body.clientId
  User.authenticate(req.body.username,req.body.password,function(err,user){
    if(err || !user){
      res.render('login',{clientId: req.body.clientId, message:'用户名或密码不正确！'});
      return;
    }
    req.session.user = user;
    next();
  });
}
var handleRegister = function(req,res,next){
  console.log('[handleRegister] user register...');
  User.registerUser(req.body.username,req.body.password,req.body.truename,function(err,user){
    if(err || !user) {
      res.render('login',{clientId: req.body.clientId, message:'用户注册失败！',register:'reg'});
      return;
    }
    req.session.user = user;
    next();
    // Client.findOne({clientId:req.body.clientId},function(err,client){
    //   if(err || !client) return next(err);
    //   //req.session.client = client;
    //   next(null,client,user);
    // });
  });
}


module.exports = {
  verifyAuthorizeQuery:verifyAuthorizeQuery,
  handleLogin:handleLogin,
  handleRegister:handleRegister,
};
