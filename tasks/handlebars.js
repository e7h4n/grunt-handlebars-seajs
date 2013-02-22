/*
 * handlebars.js
 *
 * Copyright (c) 2012 "PerfectWorks" Ethan Zhang
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

/*jslint node: true, vars: true, nomen: true, indent: 4, plusplus: true, sloppy: true*/

module.exports = function (grunt) {
    var path = require('path');
    var handlebars = require('handlebars');

    function expandFiles(param) {
        if (grunt.file.expand) {
            return grunt.file.expand({
                filter: 'isFile'
            }, param);
        }

        return grunt.file.expandFiles(param);
    }

    /**
     * Convert mustache template file to javascript script.
     */
    function generateTemplate(filePath, rootPath, tmplClass) {
        var content = grunt.file.read(filePath);
        var moduleName = filePath.replace(rootPath, '').replace(/^\//, '');

        /*
         * Calc out the className in `require` function
         * xxx.handlebars -> ../util/Template
         * a/xxx.handlebars -> ../../util/Template
         * a/a/xxx.handlebars -> ../../../util/Template
         */
        var pathCount = moduleName.split('/').length - 1;
        while (pathCount > 0) {
            tmplClass = '../' + tmplClass;
            pathCount -= 1;
        }

        var precompile = handlebars.precompile(content);

        return 'define(function(require){' +
            'var Template = require("' + tmplClass + '");' +
            'return new Template("' + moduleName + '", ' + precompile + ');' +
            '});';
    }

    grunt.registerMultiTask('handlebars', 'Compile handlebars template to SeaJS module.', function (arg1, arg2) {
        var options = this.options();

        this.files.forEach(function (file) {
            var src = file.src[0];
            var dest = file.dest;

            var result = generateTemplate(src, file.orig.cwd, options.templateModule);

            grunt.file.write(file.dest, result);

            grunt.log.writeln('File ' + file.dest.cyan + ' created.');
        });
    });

};
