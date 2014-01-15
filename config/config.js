var path = require('path'),
        rootPath = path.normalize(__dirname + '/..'),
        localAudioPath = path.normalize(__dirname + '/../localaudio'),
        env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'misteraudio'
        },
        port: 3000,
        db: 'mysql://root@localhost/misteraudio_dev',
        localAudio: localAudioPath

    },

    test: {
        root: rootPath,
        app: {
            name: 'misteraudio'
        },
        port: 3000,
        db: 'mysql://root@localhost/misteraudio_test',
        localAudio: localAudioPath
    },

    production: {
        root: rootPath,
        app: {
            name: 'misteraudio'
        },
        port: 3000,
        db: 'mysql://root@localhost/misteraudio_prod',
        localAudio: localAudioPath
    }
};

module.exports = config[env];
