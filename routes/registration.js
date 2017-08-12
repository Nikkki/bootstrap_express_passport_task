const passport = require('passport'),
    Account = require('../models/user'),
    Info = require('../models/diff_info');





var isAuthenticated = function (req, res, next) {
    if (global.global_session_user)
        return next();
    else if (!req.user) {
        res.redirect('/');
    } else {
        return res.status(401).json({
            error: 'User not authenticated'
        })

    }

}

module.exports = function (app) {
    app.get('/register', function (req, res) {
        res.render('register');
    });

    app.post('/register', function (req, res) {

        //------
        let promise = new Promise((resolve) => {
            resolve(Info.getLastUserId(true));
        });
        //------
        promise.then(
            result => {
                Account.register(new Account({
                    username: req.body.username,
                    email: req.body.email,
                    role: 'user',
                    user_id: ++result

                }), req.body.password, function (err, account) {
                    if (err) {
                        console.log('тут ошибка');

                        return res.send(err.message);
                    }
                    global.global_session_user = account;
                    passport.authenticate('local')(req, res, function () {
                        res.redirect('/' + account.user_id);
                    });

                });
            }
        )


    });

    app.get('/login', function (req, res) {
        if (global.global_session_user) {
            //console.log(global.global_session_user);
            res.redirect('/' + global.global_session_user.user_id);
        } else {
            console.log('get index render');

            res.render('index');
        }
    });

    app.post('/login',
        passport.authenticate('local'),
        (req, res) => {
            if (req.user) {
                console.log(req.user);
                global.global_session_user = req.user;
                res.redirect('/' + req.user.user_id);
            }
            else {
                res.redirect('/login');
            }
        });

    app.get('/logout', function (req, res) {
        global.global_session_user = null;
        req.logout();
        res.redirect('/');
    });
}
