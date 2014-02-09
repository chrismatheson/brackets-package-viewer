/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, window, Mustache, brackets */
define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    var ProjectManager = brackets.getModule("project/ProjectManager");

    var template, $viewContainer;

    ExtensionUtils.loadFile(module, './panel.tpl.html').complete(function (data) {
        template = data.responseText;
    });
    ExtensionUtils.loadStyleSheet(module, './panel.less');

    function filterForPackages(fileObj) {
        return fileObj._name.match(/(package\.json)|(readme\.)/i);
    }

    function render(fullPath, $editor) {
        console.log('render called');

        $viewContainer = $('<div id="package-viewer"/>');
        $editor.append($viewContainer);

        ProjectManager.getAllFiles(filterForPackages).then(function (packages) {
            ExtensionUtils.loadFile(module, './package.json').complete(function (data) {
                $(Mustache.render(template, JSON.parse(data.responseText))).appendTo($viewContainer);
            });
        });

        // use github for rendering markdown - http://developer.github.com/v3/markdown/
    }

    function cleanup() {
        $viewContainer.remove();
        console.log('sweeping up');
    }

    exports.onRemove = cleanup;
    exports.render = render;
});
