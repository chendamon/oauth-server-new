function IdDuplication(message){
  this.code = 200;
  this.message = message;
  Error.call(this);
}
function InvalidRequest(message){
  this.code = 400;
  this.message = message;
  Error.call(this);
}
module.exports = {
  IdDuplication:IdDuplication,
  InvalidRequest:InvalidRequest,
};
