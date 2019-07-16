var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Client = new Schema({
  clientId:{
    type:String,
    unique:true,
    required:true,
  },
  clientSecret:{
    type:String,
    required:true,
  },
  redirectUris:{
    type:Array,
    required:true,
  },
  grants:{
    type:Array,
    default:['authorization_code'],
  },
});

Client.static('getClient',function(clientId, clientSecret, cb){
  if(!clientSecret){
    console.log('[getClient] Getting client without clientSecret.....');
    client_model.findOne({clientId:clientId},cb);
  }else{
    console.log('[getClient] Getting client with clientSecret.....');
    client_model.findOne({clientId:clientId,clientSecret:clientSecret},cb);
  }
});
mongoose.model('Client',Client);
var client_model = mongoose.model('Client');
module.exports = client_model;
