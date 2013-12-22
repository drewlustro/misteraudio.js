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
    db: 'mysql://localhost/misteraudio-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'misteraudio'
    },
    port: 3000,
    db: 'mysql://localhost/misteraudio-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'misteraudio'
    },
    port: 3000,
    db: 'mysql://localhost/misteraudio-production'
  }
};

module.exports = config[env];
