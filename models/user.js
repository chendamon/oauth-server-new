var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var errors = require('../errors');

var User = new Schema({
  userId:{
    type:String,
    unique:true,
    required:true,
  },
  username:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  created:{
    type:Date,
    default:Date.now,
  },
});
//用户密码加密
function hashPassword(password){
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password,salt);
}

//用户注册
User.static('registerUser',function(userId,password,username,cb){
  //先查看是否当前userid已经存在
  user_model.findOne({userId:userId},function(err,a_user){
    if(a_user){
      return cb(errors.IdDuplication('重复的用户ID'));
    }
  });
  var user = new user_model({
    userId:userId,
    password:hashPassword(password),
    username:username,
  });
  user.save(function(err){
    if(err){
      return cb(err);
    }
    cb(null,user);
  });
});
//验证用户名密码
User.static('authenticate',function(userId,password,cb){
  user_model.findOne({userId:userId},function(err,user){
    if(err || !user) return cb(err);
    cb(null,bcrypt.compareSync(password,user.password) ? user:null);
  });
});

User.static('getUser',function(userId,password,cb){
  console.log('Getting user.....');
  user_model.authenticate(userId,password,function(err,user){
    if(err || !user) return cb(err);
    cb(null,user);
  });
});
mongoose.model('User',User);
var user_model = mongoose.model('User');
module.exports = user_model;
