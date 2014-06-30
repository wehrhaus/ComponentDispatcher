/* global requirejs */
define([], function () { 'use strict';

    var ModuleDispatcher = function () {

        var noop = function () {},
            requireMod = noop;

        /**
         * Takes @namespaces, requires the module.
         * Splits the remaining namespaces into an array and loops through
         * namespaces until a function is found, then calls.
         */
        requireMod = function (namespaces, options) {
            var nsArray = namespaces.split('.'),
                module = nsArray.shift(),
                namespace = nsArray,
                func = nsArray.pop(),
                callback = {},
                nsLength = nsArray.length,
                i = 0;


            requirejs(['modules/' + module], function (module) {
                var context = module;
                for (i = 0; i <= namespace.length; i += 1) {
                    if (namespace[i] !== undefined) {
                        context = module[namespace[i]];
                    }
                    try {
                        callback = context[func];
                        if (typeof callback === 'function') {
                            return callback.call(context, options);
                        }
                    } catch (err) {
                        throw new Error('ComponentDispatcher.stringToFunction - ' + err);
                    }
                }
            });
        };

        /**
         * Send valid `data-module` attributes found in the DOM
         * to requireMod(@namespaces, [@options]).
         * Include data-module-options as @options.
         */
        this.moduleDispatch = function () {
            var components = document.querySelectorAll('[data-module]'),
                component = {}, option = {}, options = {}, o = 0, j = 0, i = 0;

            for (o in components) {
                if (
                    components.hasOwnProperty(o) &&
                    typeof components[o] === 'object' &&
                    typeof components[o].getAttribute('data-module') !== undefined
                ) {
                    component = [];
                    component = components[o].getAttribute('data-module').split(' ');
                    if (components[o].getAttribute('data-module-options') !== null) {
                        options = JSON.parse(components[o].getAttribute('data-module-options'));
                    }
                    for (i = 0; i < component.length; i += 1) {
                        options.dataComponentCaller = components[o];
                        requireMod(component[i], options);
                        resetVars();
                    }
                }
            }

            /* quick reset of variables populated within each data-module */
            function resetVars() {
                component = {};
                option = {};
                options = {};
                o = 0;
                j = 0;
                i = 0;
            }
        };

    },
    componentdispatcher = new ModuleDispatcher();

    return componentdispatcher.moduleDispatch();

});
