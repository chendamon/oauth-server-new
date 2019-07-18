var util = require('util');

function InvalidRequestError(message){
  this.code = 400;
  this.message = message;
  Error.call(this);
}
util.inherits(InvalidRequestError,Error);

module.exports = InvalidRequestError;
