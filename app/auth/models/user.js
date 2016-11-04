
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
var User = new Schema({
  username: String,
  password: String,
  pollsCount: { type: Number, default: 0 }, 
  polls:{ type : Array , default : [] }
});

module.exports = mongoose.model('user', User);