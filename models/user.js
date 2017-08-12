const { mongoose } = require('../configs');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    email: String,
    role: {
        type: String,
        default: 'user'
    },
    username: String,
    lastName: String,
    firstName: String,
    password: String,
    user_id: Number,
    banned: {
        type: Boolean,
        default: false
    },
    age: Number,
    user_avatar_path: String
});

UserSchema.plugin(passportLocalMongoose);

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getAllUsers = () => {

}

module.exports.saveUserSettings = (username, user) => {
    UserSchema.findOne({'username': username}, (err, person) => {
        person.age = user.age;
        person.firstName = user.firstName;
        person.lastName = user.lastName;
        person.username = user.username;
        person.save();
    });
}