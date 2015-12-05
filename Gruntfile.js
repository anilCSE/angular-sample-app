'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: {
      test: {
        NODE_ENV: 'test'
      },
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },
    watch: {
      clientViews: {
        files: ['modules/*/views/**/*.html'],
        options: {
          livereload: true
        }
      },
      clientJS: {
        files: [
          'modules/*/*.js',
          'modules/*/**/*.js'
        ],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      clientCSS: {
        files: ['modules/*/css/*.css'],
        tasks: ['csslint'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: _.union('modules/*/*.js', 'modules/*/**/*.js'),
        options: {
          jshintrc: true
        }
      }
    },
    eslint: {
      options: {},
      target: _.union('modules/*/*.js', 'modules/*/**/*.js')
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      all: {
        src: ['modules/*/css/*.css']
      }
    },
    uglify: {
      production: {
        options: {
          mangle: false
        },
        files: {
          'public/dist/application.min.js': 'public/dist/application.js'
        }
      }
    },
    'node-inspector': {
      custom: {
        options: {
          'web-port': 1337,
          'web-host': 'localhost',
          'debug-port': 5858,
          'save-live-edit': true,
          'no-preload': true,
          'stack-trace-limit': 50,
          'hidden': []
        }
      }
    }
  });

  grunt.event.on('coverage', function(lcovFileContents, done) {
    // Set coverage config so karma-coverage knows to run coverage
    testConfig.coverage = true;
    require('coveralls').handleInput(lcovFileContents, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-protractor-coverage');

  // Lint CSS and JavaScript files.
  grunt.registerTask('lint', ['jshint', 'eslint', 'csslint']);

  // Run the project in development mode
  grunt.registerTask('default', ['lint']);

  // Run the project in debug mode
  grunt.registerTask('debug', ['lint']);
};
