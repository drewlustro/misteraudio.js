var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'misteraudio'
    },
    port: 3000,
    db: 'mysql://root@localhost/misteraudio_dev'
  },

  test: {
    root: rootPath,
    app: {
      name: 'misteraudio'
    },
    port: 3000,
    db: 'mysql://root@localhost/misteraudio_test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'misteraudio'
    },
    port: 3000,
    db: 'mysql://root@localhost/misteraudio_prod'
  }
};

module.exports = config[env];
