/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

define(function (require, exports, module) {
    'use strict';

    console.log("INITIALIZING BRACKETS PACKAGE VIEW EXTENSION");

    var EditorManager  = brackets.getModule("editor/EditorManager");
    var AppInit = brackets.getModule("utils/AppInit");
    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    var FileViewController = brackets.getModule("project/FileViewController");
    //var DocumentManager = brackets.getModule("document/DocumentManager");

    /**
     * program starts here
     */
    var currentPathCache, $toolbarButton, viewProvider;
    /* create toolbar button to show / hide extensions pannel*/
    $toolbarButton = $('<a id="package-viewer"></a>');
    $toolbarButton.css('background-image', 'url("' + require.toUrl('./package-viewer.png') + '")');

    viewProvider = require('./packageViewer');

    function handleToolbarClick() {
        if (EditorManager.showingCustomViewerForPath('package-viewer')) {
            FileViewController.openAndSelectDocument(currentPathCache, "ProjectManager");
            EditorManager.closeCustomViewer();
        } else {
            currentPathCache = EditorManager.getCurrentlyViewedPath();
            EditorManager.showCustomViewer(viewProvider, 'package-viewer');
        }
    }
    $toolbarButton.click(handleToolbarClick);

    AppInit.appReady(function () {
        $('#main-toolbar .buttons').append($toolbarButton);
    });
});
