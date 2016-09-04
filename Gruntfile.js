module.exports = function(grunt) {

  grunt.initConfig({
    
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['public/app/**/*.js'] 
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['nodemon']);

};