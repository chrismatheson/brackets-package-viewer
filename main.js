/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

define(function (require, exports, module) {
    'use strict';

    console.log("INITIALIZING BRACKETS PACKAGE VIEW EXTENSION");

    var EditorManager  = brackets.getModule("editor/EditorManager");
    var AppInit = brackets.getModule("utils/AppInit");
    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    var PanelManager = brackets.getModule("view/PanelManager");
    var ProjectManager = brackets.getModule("project/ProjectManager");

    /**
     * program starts here
     */
    var currentPath, $toolbarButton, viewProvider, $panel, template;


    /* create toolbar button to show / hide extensions pannel*/
    $toolbarButton = $('<a id="package-viewer-button"></a>');
    $toolbarButton.css('background-image', 'url("' + require.toUrl('./package-viewer.png') + '")');

    $panel = $('<div id="package-viewer" class="bottom-panel vert-resizable top-resizer" style="overflow: scroll;"/>');
    $panel.html('<h1> Hi, Mom</h1>');
    PanelManager.createBottomPanel("package-viewer", $panel);


    function filterForPackages(fileObj) {
        return fileObj.name.match(/(package\.json)/i);
    }

    function loadFiles(fileList) {
        var basePath = ProjectManager.getProjectRoot()._path;

        fileList = fileList.map(function (fileObject) {
            return fileObject._path.replace(basePath, '');
        });

        var promisedFiles = fileList.map(function (path) {
            return ExtensionUtils.loadFile(module, path)
                .then(JSON.parse);
        });
        return $.when.apply(this, promisedFiles);
    }

    /**
     * Most basic extry point for the extension. From here we try and find the closest package.json file
     * and open it for viewing in our custom viewer
     */
    function handleToolbarClick() {
        $panel.toggle();

        /**
         * find all package.json & bower.json files in this project
         */
        ProjectManager.getAllFiles(filterForPackages)
            .then(loadFiles)
            .then(function () {
                $panel.children().remove();
                Array.prototype.map.call(arguments, function (pkg) {
                    console.log('rendering: ' + pkg.name);
                    $(Mustache.render(template, pkg)).appendTo($panel);
                });
            });

        EditorManager.resizeEditor();
    }
    $toolbarButton.click(handleToolbarClick);


    AppInit.appReady(function () {
        $('#main-toolbar .buttons').append($toolbarButton);

        ExtensionUtils.loadFile(module, './panel.tpl.html')
            .complete(function (data) {
                template = data.responseText;
                console.log('loaded panel template');
            });
        ExtensionUtils.loadStyleSheet(module, './panel.less');
    });
});
