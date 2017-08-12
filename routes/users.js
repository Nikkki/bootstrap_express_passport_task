const passport = require('passport'),
    Account = require('../models/user');




function loggedIn(req, res, next) {
    if (req.user && req.user.user_id) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = function (app) {
    app.get('/:id', (req, res) => {

        if (!global.global_session_user) {
            return res.status(403).send('У вас нет доступа к старнице')
        }

        res.render('user/userPage', { user: global.global_session_user });
    })
    app.get('/:id/settings', (req, res) => {
        if (!global.global_session_user) {
            return res.status(403).send('У вас нет доступа к старнице')
        }

        res.render('user/userSettings', { user: global.global_session_user });
    })

    app.post('/:id/settings', (req, res) => {
        if (!global.global_session_user) {
            return res.status(403).send('У вас нет доступа к старнице')
        }

        res.render('user/userSettings', { user: global.global_session_user });
    })

    app.get('/:id/users', (req, res) => {
        console.log(global.global_session_user)
        if (!global.global_session_user || global.global_session_user.role !== 'superuser') {
            return res.status(403).send('У вас нет доступа к старнице')
        }

        res.render('user/userUsers', { user: global.global_session_user });
    })
}