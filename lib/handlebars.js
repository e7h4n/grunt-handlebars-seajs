'use strict';

var handlebars = require('handlebars');

module.exports.compile = function (moduleName, content, tmplClass) {
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
};
