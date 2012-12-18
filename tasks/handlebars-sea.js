/*
 * grunt-handlebars-sea
 * https://github.com/pw/grunt-handlebars-seajs
 *
 * Copyright (c) 2012 perfectworks
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('handlebars-sea', 'Your task description goes here.', function() {
    grunt.log.write(grunt.helper('handlebars-sea'));
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('handlebars-sea', function() {
    return 'handlebars-sea!!!';
  });

};
