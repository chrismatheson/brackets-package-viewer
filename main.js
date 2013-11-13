/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache */

/** {ext_name} Extension
    description
*/
define(function (require, exports, module) {
    'use strict';

    console.log("INITIALIZING BRACKETS PACKAGE VIEW EXTENSION");

    var EditorManager  = brackets.getModule("editor/EditorManager");
    var AppInit = brackets.getModule("utils/AppInit");
    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    //var NativeApp = brackets.getModule("utils/NativeApp");
    //var Commands = brackets.getModule("command/Commands");
    //var ProjectManager = brackets.getModule("project/ProjectManager");
    //var DocumentManager = brackets.getModule("document/DocumentManager");

    //TODO later - register quickdocs handler to open panel
    //EditorManager.registerInlineDocsProvider()

    /* create toolbar button to show / hide extensions pannel*/
    var $toolbarButton = $('<a id="package-viewer"></a>');
    $toolbarButton.css('background-image', 'url("' + require.toUrl('./package-viewer.png') + '")');

//    var viewPath = require.toUrl('./packageViewer.js');
    var viewProvider = require('./packageViewer');

    function handleToolbarClick() {
        if (EditorManager.showingCustomViewerForPath('package-viewer')) {
            EditorManager.closeCustomViewer();
        } else {
            EditorManager.showCustomViewer(viewProvider, 'package-viewer');
        }
    }
    $toolbarButton.click(handleToolbarClick);

    AppInit.appReady(function () {
        $('#main-toolbar .buttons').append($toolbarButton);
    });
});