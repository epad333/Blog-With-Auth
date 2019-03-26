var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var UserSchema = new mongoose.Schema({
  name: String,
  userid: String,
  displayPic: [ ] ,
  updated_at: { type: Date, default: Date.now },
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);