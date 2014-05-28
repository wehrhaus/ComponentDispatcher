var ComponentDispatcher = function () {

    /**
     * Utility to call string as function.
     * Splits the string into an array and loops through
     * namespaces until a function is found.
     * Uses `window` as context unless specified otherwise.
     * Accepts 3rd parameter as arguments.
     */
    var stringToFunction = function (stringAsFunction, context) {
        var i = 0, args = [],
        namespaces = stringAsFunction.split('.'),
        func = namespaces.pop(),
        callback = null;

        context = context || window;
        args.push(arguments[2]);

        for (i = 0; i <= namespaces.length; i += 1) {
            if (namespaces[i] !== undefined) {
                context = context[namespaces[i]];
            }
            try {
                callback = context[func];
                if (typeof callback === 'function') {
                    return callback.apply(context, args);
                }
            } catch (err) {
                throw new Error('ComponentDispatcher.stringToFunction - ' + err);
            }
        }
    };

    /**
     * Send valid `data-component` attributes found in the DOM
     * to stringAsFunction(@data-component, @window, [@data-component-options])
     * if the component has not already been dispatched.
     * Include data-component-options as argument.
     */
    this.componentDispatch = function () {
        var components = document.querySelectorAll('[data-component]'),
            component = null, option = null, options = {}, o = null, j = null, i = null;

        for (o in components) {
            if (
                components.hasOwnProperty(o) &&
                typeof components[o] === 'object' &&
                typeof components[o].getAttribute('data-component') !== undefined
            ) {
                component = [];
                component = components[o].getAttribute('data-component').split(' ');
                if (components[o].getAttribute('data-component-options') !== null) {
                    options = JSON.parse(components[o].getAttribute('data-component-options'));
                }
                for (i = 0; i < component.length; i += 1) {
                    options.dataComponentCaller = components[o];
                    stringToFunction(component[i], window, options);
                }
            }
        }
    };

};

var componentdispatcher = new ComponentDispatcher();
componentdispatcher.componentDispatch();
