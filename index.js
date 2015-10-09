//It is main file of application.


'use strict';

var app = require('./app'); //Require our app
var config    = require(__dirname + '/config/configServer.json'); //Server config
var models = require("./models");

app.set('port', config.port || 8000); //Set server port

models.sequelize.sync().then(function () { //sequelize sync
	//Server start
	var server = app.listen(app.get('port'), function() {
	  console.log('Express server listening on http://' + server.address().address + ':' + server.address().port);
	});
});