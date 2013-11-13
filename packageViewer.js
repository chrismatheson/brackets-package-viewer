/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, window, Mustache */
define(function (require, exports, module) {
    "use strict";

    function getCustomViewHolder() {
        $('<div id="package-viewer">Hello from package viewer</div>');
    }

    /**
     * traverse up project hierachy, starting at fullPath, building our view model
     */
    function render(fullPath) {

    }

    exports.getCustomViewHolder = getCustomViewHolder;
    exports.render              = render;
});