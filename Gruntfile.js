'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
};

var request = require('request');

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var files;

    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        connectport: 3000
    };


    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),
        develop: {
            server: {
                file: 'app.js'
            }
        },
        watch: {
            options: {
                nospawn: true,
            },
            compass: {
                    files: ['<%= yeoman.app %>/public/styles/{,*/}*.{scss,sass}'],
                    tasks: ['compass:server', 'autoprefixer']
            },
            js: {
                files: [
                    'app.js',
                    'app/**/*.js',
                    'config/*.js'
                ],
                tasks: ['develop', 'delayed-livereload']
            },
            jade: {
                files: ['app/views/**/*.jade'],
                options: { livereload: LIVERELOAD_PORT }
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/views/**/*.jade',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/public/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/public/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        connect: {
            options: {
                port: 3000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '127.0.0.1'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            }
        },
        
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/public/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/public/img',
                javascriptsDir: '<%= yeoman.app %>/public/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/public/bower_components',
                httpImagesPath: '/img',
                httpGeneratedImagesPath: '/img/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
            },
            server: {
                options: {
                        debugInfo: true
                }
            }
        },

        copy: {
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/public/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            images: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/public/img',
                src: '{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}',
                dest: '.tmp/img/',

            }
        },
        open: {
            server: {
                path: 'http://127.0.0.1:<%= yeoman.connectport %>'
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        concurrent: {
            server: [
                'compass',
                //'coffee:dist',
                'copy:styles',
                'copy:images'
            ],
            test: [
                //'coffee',
                'copy:styles'
            ],
            dist: [
                //'coffee',
                'compass',
                'copy:styles',
                //'imagemin',
                //'svgmin',
                //'htmlmin'
            ]
        }
        
    });

    grunt.config.requires('watch.js.files');
    files = grunt.config('watch.js.files');
    files = grunt.file.expand(files);

    grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
        var done = this.async();
        setTimeout(function () {
            request.get('http://localhost:' + LIVERELOAD_PORT + '/changed?files=' + files.join(','),  function(err, res) {
                var reloaded = !err && res.statusCode === 200;
                if (reloaded)
                    grunt.log.ok('Delayed live reload successful.');
                else
                    grunt.log.error('Unable to make a delayed live reload.');
                done(reloaded);
            });
        }, 500);
    });

    grunt.registerTask('server', [
        'concurrent:server',
        'autoprefixer',
        'develop',
        'open',
        'watch'
    ]);

    grunt.registerTask('default', [
        'develop',
        'open',
        'watch'
    ]);
};
