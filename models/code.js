var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Code = new Schema({
  authorizationCode:{
    type:String,
    required:true,
  },
  user:{
    type:Object,
    required:true,
  },
  client:{
    type:Object,
    required:true,
  },
  expiresAt:Date,
  redirectUri:{
    type:String,
    required:true,
  }
});
// function uid(len){
//   var buf = [];
//   var charts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   var charlen = charts.length;
//   for(var i =0; i < len; i++){
//     buf.push(charts[getRandomInt(0,charlen-1)]);
//   }
//   return buf.join('');
// }
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// Code.static('generateAuthorizationCode',function(req,res, next){
//   console.log('Generating authCode.....');
//   var date_now = Date.now();
//   var date_exp = date_now.addMilliseconds(1000*60*5);//code的有效时间设置为5分钟
//   var code = new code_model({
//     code:uid(16),
//     client:client,
//     user:user,
//     expireAt:date_exp,
//   });
//   next(null,code,client,user);
// });

module.exports = mongoose.model('Code',Code);
