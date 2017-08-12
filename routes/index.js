/* GET home page. */
module.exports = (app) =>{
	app.get('/', function(req, res, next) {
	res.render('index');
});

}


