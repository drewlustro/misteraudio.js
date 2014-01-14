module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);

    app.get('/pause', home.pause);
    app.get('/resume', home.resume);
    app.get('/stop', home.stop);

    app.get('/restart-audio', home.restartAudioServices);

};
