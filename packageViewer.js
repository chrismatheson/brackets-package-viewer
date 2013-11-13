/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, window, Mustache, brackets */
define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");

    var template, pkg;

    ExtensionUtils.loadFile(module, './panel.tpl.html').complete(function (data) {
        template = data.responseText;
    });

    ExtensionUtils.loadFile(module, './package.json').complete(function (data) {
        pkg = JSON.parse(data.responseText);
    });

    function getCustomViewHolder() {
        return $(Mustache.render(template, pkg));
    }

    /**
     * traverse up project hierachy, starting at fullPath, building our view model
     */
    function render(fullPath) {
        // use github for rendering markdown - http://developer.github.com/v3/markdown/
        console.log('render called');
    }

    exports.getCustomViewHolder = getCustomViewHolder;
    exports.render              = render;
});