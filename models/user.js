var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
module.exports = mongoose.model('User',User);
