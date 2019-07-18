var bcrypt = require('bcrypt');
var User = require('./user');
var RegisterIdDuplicationError = require('../errors/RegisterIdDuplicationError');

//用户密码加密
function hashPassword(password){
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password,salt);
}

//用户注册
var registerUser =  function(userId,password,username,cb){
  //先查看是否当前userid已经存在
  User.findOne({userId:userId},function(err,a_user){
    if(a_user){
      return cb(new RegisterIdDuplicationError('用户ID已存在！'),null);
    }else if (err) {
      return cb(err,null);
    }else{
      var user = new User({
        userId:userId,
        password:hashPassword(password),
        username:username,
      });
      user.save(function(err){
        if(err){
          return cb(err,null);
        }
        cb(null,user);
      });
    }
  });
}
//验证用户名密码
var authenticate = function(userId,password,cb){
  User.findOne({userId:userId},function(err,user){
    if(err || !user) return cb(err);
    cb(null,bcrypt.compareSync(password,user.password) ? user:null);
  });
}

var getUser = function(userId,password,cb){
  console.log('Getting user.....');
  User.authenticate(userId,password,function(err,user){
    if(err || !user) return cb(err);
    cb(null,user);
  });
}

module.exports = {
  registerUser:registerUser,
  authenticate:authenticate,
  getUser:getUser,
};
