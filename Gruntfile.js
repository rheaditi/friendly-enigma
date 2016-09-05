module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    wiredep: {
      dev: {
        src: ['public/index.html']
      }
    },

    //concurrent: {
    //  dev: ['nodemon:dev', 'wiredep']
    //},

    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['public/app/**/*.js'] 
    }
  });

  grunt.registerTask('default', ['wiredep', 'nodemon']);

};