var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var token = new Schema({
  accessToken: { type: String },
  accessTokenExpiresAt: { type: Date },
  client : { type: Object },  // `client` and `user` are required in multiple places, for example `getAccessToken()`
  clientId: { type: String },
  refreshToken: { type: String },
  refreshTokenExpiresAt: { type: Date },
  user : { type: Object },
  userId: { type: String },
  scope:{ type: String},
});





module.exports = mongoose.model('token',token);
