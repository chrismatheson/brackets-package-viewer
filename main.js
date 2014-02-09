/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

define(function (require, exports, module) {
    'use strict';

    console.log("INITIALIZING BRACKETS PACKAGE VIEW EXTENSION");

    var EditorManager  = brackets.getModule("editor/EditorManager");
    var AppInit = brackets.getModule("utils/AppInit");
    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    var FileViewController = brackets.getModule("project/FileViewController");

    /**
     * program starts here
     */
    var currentPath, $toolbarButton, viewProvider;
    /* create toolbar button to show / hide extensions pannel*/
    $toolbarButton = $('<a id="package-viewer"></a>');
    $toolbarButton.css('background-image', 'url("' + require.toUrl('./package-viewer.png') + '")');

    viewProvider = require('./packageViewer');

    /**
     * Most basic extry point for the extension. From here we try and find the closest package.json file
     * and open it for viewing in our custom viewer
     */
    function handleToolbarClick() {
        currentPath = EditorManager.getCurrentlyViewedPath();

        if (EditorManager.showingCustomViewerForPath(currentPath)) {
            EditorManager.closeCustomViewer();
            FileViewController.openAndSelectDocument(currentPath, "ProjectManager");
        } else {
            EditorManager.showCustomViewer(viewProvider, currentPath);
        }
    }
    $toolbarButton.click(handleToolbarClick);

    AppInit.appReady(function () {
        $('#main-toolbar .buttons').append($toolbarButton);
    });
});
