var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String
});

/*UserSchema.methods.test = function (cb) {
  return 'test method schema';
};

UserSchema.methods.testFind = function (cb) {
  return 'test method schema';
}*/

module.exports = mongoose.model('User', UserSchema);
