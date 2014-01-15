module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);

    app.get('/pause', home.pause);
    app.get('/play', home.play);
    app.get('/stop', home.stop);
    app.get('/currentSong', home.currentSong);    

    app.get('/restart-audio', home.restartAudioServices);

};
