module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        lint: {
            files: ['Gruntfile.js', 'tasks/**/*.js']
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: true
            }
        }
    });

    // Load local tasks.
    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['jshint']);
};
