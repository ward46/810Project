module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      production: {
        NODE_ENV: 'production'
      }
    },
    nodemon: {
      dev: {
        script: 'index.js'
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        esversion: 6
      },
      all: ['Gruntfile.js', 'config/*.js']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-nodemon');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  // Default task(s).
  grunt.registerTask('default', [
    'env:dev',
    'jshint',
    'nodemon'
  ]);
  grunt.registerTask('production', [
    'env:production',
    'nodemon'
  ]);

};