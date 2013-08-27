/*
 * handlebars.js
 *
 * Copyright (c) 2012 "PerfectWorks" Ethan Zhang
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function (grunt) {
    var compile = require('../lib/handlebars').compile;

    /**
     * Convert mustache template file to javascript script.
     */
    function generateTemplate(filePath, rootPath, tmplClass) {
        var content = grunt.file.read(filePath);
        var moduleName = filePath.replace(rootPath, '').replace(/^\//, '');

        return compile(moduleName, content, tmplClass);
    }

    grunt.registerMultiTask('handlebars', 'Compile handlebars template to SeaJS module.', function () {
        var options = this.options();

        this.files.forEach(function (file) {
            var src = file.src[0];

            var result = generateTemplate(src, file.orig.cwd, options.templateModule);

            grunt.file.write(file.dest, result);

            grunt.log.writeln('File ' + file.dest.cyan + ' created.');
        });
    });

};
