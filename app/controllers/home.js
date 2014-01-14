var db = require('orm').db,
  Article = db.models.article;

exports.index = function(req, res){
  Article.find(function(err, articles){
    if(err) throw new Error(err);
    res.render('home/index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
};

exports.restartAudioServices = function(req, res){
  res.json({ action: 'restartAudioServices'});
};

exports.pause = function(req, res){
  res.json({ action: 'pause'});
};

exports.resume = function(req, res){
  res.json({ action: 'resume'});
};

exports.stop = function(req, res){
  res.json({ action: 'stop'});
};
