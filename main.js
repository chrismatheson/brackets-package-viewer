/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

define(function (require, exports, module) {
    'use strict';

    console.log("INITIALIZING BRACKETS PACKAGE VIEW EXTENSION");

    var EditorManager  = brackets.getModule("editor/EditorManager");
    var AppInit = brackets.getModule("utils/AppInit");
    var FileUtils = brackets.getModule("file/FileUtils");
    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    var PanelManager = brackets.getModule("view/PanelManager");
    var ProjectManager = brackets.getModule("project/ProjectManager");

    /**
     * program starts here
     */
    var currentPath, $toolbarButton, viewProvider, $panel, template;


    /* create toolbar button to show / hide extensions pannel*/
    $toolbarButton = $('<a id="package-viewer-button"></a>');
//    $toolbarButton.css('background-image', 'url("' + require.toUrl('./package-viewer.png') + '")');

    $panel = $('<div id="package-viewer" class="bottom-panel vert-resizable top-resizer"/>');
    $panel.html('<h1> Hi, Mom</h1>');
    PanelManager.createBottomPanel("package-viewer", $panel);


    function filterForPackages(fileObj) {
        return fileObj.name.match(/(package\.json)/i);
    }

    function loadFiles(fileList) {
        fileList.sort(function (a, b) {
            if (a._path < b._path) { return 1 ;}
            if (a._path > b._path) { return -1 ;}
            return 0;
        });
        var promisedFiles = fileList.map(function (file) {
            return FileUtils.readAsText(file).then(JSON.parse);
        });
        return $.when.apply(this, promisedFiles);
    }

    /**
     * Most basic extry point for the extension. From here we try and find the closest package.json file
     * and open it for viewing in our custom viewer
     */
    function handleToolbarClick() {
        $panel.toggle();
        $toolbarButton.toggleClass('checked');
        /**
         * find all package.json & bower.json files in this project
         */
        ProjectManager.getAllFiles(filterForPackages)
            .then(loadFiles)
            .then(function () {
                $panel.children().remove();
                Array.prototype.map.call(arguments, function (pkg) {
                    console.log('rendering: ' + pkg.name);
                    //Dont like altering the package.json object but cant thinkg of a way round this with mustache engine
                    var _arr = [];
                    pkg.dependencies = pkg.dependencies || {};
                    Object.keys(pkg.dependencies).forEach(function (k) {
                        _arr.push({"name":k, "version":pkg.dependencies[k]});
                    });
                    pkg.dependencies = _arr;
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
        ExtensionUtils.loadStyleSheet(module, 'panel.css');
    });
});
