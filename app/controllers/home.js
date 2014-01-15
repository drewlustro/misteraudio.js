var db = require('orm').db,
    Article = db.models.article,
    getLocalAudioConnection = require('../lib/localaudio').getLocalAudioConnection;



exports.index = function(req, res){
    res.render('home/index', {});
};

exports.play = function(req, res){
  getLocalAudioConnection(function(err, localAudio) {
    localAudio.play();
    res.json({ action: 'play'});  
  });
  
};

exports.pause = function(req, res){
  getLocalAudioConnection(function(err, localAudio) {
    localAudio.toggle();
    res.json({ action: 'toggle'});  
  });
};

exports.stop = function(req, res){
  getLocalAudioConnection(function(err, localAudio) {
    localAudio.stop();
    res.json({ action: 'stop'});  
  });
};

exports.currentSong = function (req, res) {
  getLocalAudioConnection(function(err, localAudio) {
    localAudio.currentSong(function (err, info) {
      var song = info.Artist + " - " + info.Album + " / " + info.Title;
      console.log('Current:', song);
      res.json({ action: 'currentSong', value: song });
    });    
  });
}

exports.restartAudioServices = function(req, res){
  res.json({ action: 'restartAudioServices'});
};
