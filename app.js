const express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	Account = require('./models/user'),
	session = require('express-session');

var registration = require('./routes/registration');
var index = require('./routes/index');


var app = express();




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));


// passport configs(they should be before router configs, otherwise app throws error)
app.use(passport.initialize());
app.use(passport.session());
// passport.use('local', new LocalStrategy({
// 	usernameField: 'email',
// 	passwordField: 'password',
// 	passReqToCallback: true
// }, (req, email, password, done) => {
// 	Account.findOne({ 'email': email }, (err, user) => {
// 		if (err) { 
// 			return done(err) 
// 		}
// 		if(user) {
// 			return done(null, false);
// 		}
// 		var newAccount = new Account();
// 		newAccount.email = req.body.email;
// 		newAccount.username = req.body.username;
// 		newAccount.password = req.body.pass;
		
		
// 	})
// }
// ));
passport.use(new LocalStrategy(Account.authenticate({
	passReqToCallback: true
})));

passport.serializeUser((user, done) => {

	done(null, user.user_id)
});
passport.deserializeUser( (id, done) => {
	Account.findById(id, (err, user) => {
		done(err, user);
	})
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//routes
global.global_session_user;
require('./routes/index')(app);
require('./routes/registration')(app);
require('./routes/users')(app);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});



// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
