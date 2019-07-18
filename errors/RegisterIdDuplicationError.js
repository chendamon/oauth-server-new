var util = require('util');

function RegisterIdDuplicationError(message){
  this.code = 400;
  this.message = message;
  Error.call(this);
}
util.inherits(RegisterIdDuplicationError,Error);

module.exports = RegisterIdDuplicationError;
