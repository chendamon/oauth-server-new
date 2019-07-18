var Client  = require('../models/client');
var User = require('../models/userHandler');
var InvalidRequestError = require('../errors/InvalidRequestError');

var verifyAuthorizeQuery = function(req,res,next){
  if(!req.query.response_type || req.query.response_type !== 'code'){
    return next(new InvalidRequestError('Query response_type is not code!'));
  }else if(!req.query.client_id){
    return next(new InvalidRequestError('Query should contain clientId!'));
  }else if(!req.query.redirect_uri){
    return next(new InvalidRequestError('Query should contain redirctUri!'));
  }
  Client.findOne({clientId:req.query.client_id},function(err,client){
    if(err || !client){
      return next(err);
    }
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
  User.authenticate(req.body.username,req.body.password,function(err,user){
    if(err){
      res.render('login',{clientId: req.body.clientId, message:err});
      return;
    }else if(!user){
      res.render('login',{clientId: req.body.clientId, message:'用户名或密码错误!'});
      return;
    }
    req.session.user = user;
    next();
  });
}
var handleRegister = function(req,res,next){
  console.log('[handleRegister] user register...');
  User.registerUser(req.body.username,req.body.password,req.body.truename,function(err,user){
    if(err != null) {
      res.render('login',{clientId: req.body.clientId, remessage:err.message,register:'reg'});
      return;
    }else if(!user){
      res.render('login',{clientId: req.body.clientId, remessage:'用户注册失败！',register:'reg'});
      return;
    }
    req.session.user = user;
    next();
  });
}


module.exports = {
  verifyAuthorizeQuery:verifyAuthorizeQuery,
  handleLogin:handleLogin,
  handleRegister:handleRegister,
};
