var config = require('../../config/config');
var Dovetail = require('./dovetail');
var komponist = require('komponist');

var connection = undefined;

// Create 'singleton' audio connection to MPD
// require() calls are cached, so this happens naturally as
// long as connection is scoped here.
var getLocalAudioConnection = function (readyCallback) {
    if (connection && connection.client) {
        readyCallback(undefined, connection);
    }

    connection = new LocalAudio();

    var client = komponist.createConnection(6600, 'localhost', function (err) {
        console.log('LocalAudio.connect()');

        if (!err) {
            connection.client = client;
        }

        readyCallback(err, connection);
    });
} 


var LocalAudio = function () {
    this.client = undefined;
    this.path = config.localAudio;
};

LocalAudio.prototype = new Dovetail();
LocalAudio.commands = {
    resume: 'echo "LocalAudio:resume"',
    play: 'echo "LocalAudio:play"',
    stop: 'echo "LocalAudio:stop"',
    pause: 'echo "LocalAudio:pause"',
    currentSong: 'echo "LocalAudio:currentsong"',
    status: 'echo "LocalAudio:status'
}

LocalAudio.prototype.init = function (params) {
    Dovetail.prototype.init.call(this, params);
}

LocalAudio.prototype.play = function (params) {
    params = params || {};
    var song = params[0] || undefined;

    this.client.play(function (err) {});
}

LocalAudio.prototype.toggle = function (params) {
    this.client.toggle(function (err) {});
}


LocalAudio.prototype.stop = function () {
    this.client.stop(function (err) {});
}

LocalAudio.prototype.nowPlaying =
LocalAudio.prototype.currentSong = function (callback) {
    this.client.currentsong(function (err, info) {
        console.log(info.Artist, info.Album, info.Title); // Ennio Morricone
        song = info.Artist + " - " + info.Album + " / " + info.Title;
        callback(err, info);
    });
}

LocalAudio.prototype.status = function () {
    return this.terminalCommand(LocalAudio.commands.status);
}

module.exports.getLocalAudioConnection = getLocalAudioConnection;