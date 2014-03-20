/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, window, Mustache, brackets, _*/
define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    var ProjectManager = brackets.getModule("project/ProjectManager");

    var template;

    ExtensionUtils.loadFile(module, './panel.tpl.html').complete(function (data) {
        template = data.responseText;
    });
    ExtensionUtils.loadStyleSheet(module, './panel.less');

    function filterForPackages(fileObj) {
        return fileObj._name.match(/(package\.json)|(readme\.)/i);
    }

    /**
     * Create our view of all packages
     * @param {type} fullPath path to start at
     * @param {type} viewContainer ViewContainer (cleared on call)
     */
    function render(fullPath, $viewContainer) {
        console.log('render called');
        $viewContainer.children().remove();

        ProjectManager.getAllFiles(filterForPackages).then(function (packages) {
            ExtensionUtils.loadFile(module, './package.json').complete(function (data) {
                var pkgObj = JSON.parse(data.responseText);
                pkgObj.printDeps = function () {
                    return function (text, render) {
                        var rtnStr = "";
                        $.each(this.dependencies, function (key, val) {
                            rtnStr += render(text, {key: key, val: val});
                        });
                        return rtnStr;
                    };
                };
                $(Mustache.render(template, pkgObj)).appendTo($viewContainer);
            });
        });

        // use github for rendering markdown - http://developer.github.com/v3/markdown/
    }

    exports.render = render;
});
