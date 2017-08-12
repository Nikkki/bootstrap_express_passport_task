
const bluebird = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost:27017/userTable',{
  useMongoClient: true
});
module.exports = { mongoose };