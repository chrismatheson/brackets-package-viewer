/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, window, Mustache, brackets */
define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    var ProjectManager = brackets.getModule("project/ProjectManager");

    var template, pkgmodel = [], $viewContainer;

    ExtensionUtils.loadFile(module, './panel.tpl.html').complete(function (data) {
        template = data.responseText;
    });
    ExtensionUtils.loadStyleSheet(module, './panel.less');

    //create the container
    $viewContainer = $('<div class="package-viewer"></div');


    function getCustomViewHolder(fullPath) {
        //clear out children from last render;
        $viewContainer.children().remove();
        //return an object and later fill it in
        return $viewContainer;
    }

    function filterForPackages(fileObj) {
        return fileObj._name.match(/(package\.json)|(readme\.)/i);
    }

    function render(fullPath) {
        ProjectManager.getAllFiles(filterForPackages).then(function (packages) {
            ExtensionUtils.loadFile(module, './package.json').complete(function (data) {
                pkgmodel.push(JSON.parse(data.responseText));
                $(Mustache.render(template, pkgmodel)).appendTo($viewContainer);
            });
//            var readmePath = file._parentPath + 'README.md';
        });

        // use github for rendering markdown - http://developer.github.com/v3/markdown/
        console.log('render called');
    }

    exports.getCustomViewHolder = getCustomViewHolder;
    exports.render              = render;
});
