const { mongoose } = require('../configs');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var InfoSchema = new Schema({
    last_user_id: Number
});

var Info = module.exports = mongoose.model('info', InfoSchema);

module.exports.getLastUserId =  (getNext) => {
    var last_user_id;

    let promise = new Promise((resolve, reject) => {
        Info.findOne(function (err, docs) {
            if (err) {
                console.log('some problems with mongo, cant find collection with diff info');
                res.status(500).send('problems with server(with db)');
            }

            if (docs === null) {
                var newInfo = new Info({
                    last_user_id: 1
                });
                newInfo.save((err, data) => {
                    if (err) {
                        res.status(500).send({ message: 'some issuems with the server, cant save new mongo schema' })
                    }
                    resolve(last_user_id);
                })

            }
            if (docs) {
                last_user_id = docs.last_user_id;
                if (getNext === true) {
                    ++docs.last_user_id;
                    docs.save();
                }
                resolve(last_user_id);
            }

        });
    })
    return promise.then(
        result => {
            return last_user_id
        }
    )

}   