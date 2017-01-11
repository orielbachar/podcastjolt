var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  nameFirst: {type: String, lowercase: true},
  nameLast: {type: String, lowercase: true},
  phoneNum:{type: String, lowercase: true, unique: true},
  daySums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recording'}],
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.phoneNum,
    exp: parseInt(exp.getTime() / 1000),
  }, 'myLittleSecret');
};

var User = mongoose.model('User', UserSchema);

module.exports = User;