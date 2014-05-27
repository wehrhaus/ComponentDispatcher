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
     * Keep record of dispatched components.
     *
     *
     */
    var componentDispatchRecord = {
        dispatched: {},
        createRecord: function (component, id) {
            this.dispatched[component] = id;
        },
        removeRecord: function (component) {
            delete this.dispatched[component];
        },
        dispatchExists: function (component) {
            if (this.dispatched.hasOwnProperty(component)) {
                return true;
            }
            return false;
        }
    };

    /**
     * make records public
     */
    this.getDispatchRecord = function () {
        return componentDispatchRecord.dispatched;
    };

    /**
     * make removing a record public
     */
    this.removeDispatchRecord = function (component) {
        return componentDispatchRecord.removeRecord(component);
    };

    /**
     * Send valid `data-component` attributes found in the DOM
     * to stringAsFunction(@data-component, @window, [@data-component-options])
     * if the component has not already been dispatched.
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
                options.dataComponentCaller = components[o];
                for (i = 0; i < component.length; i += 1) {
                    if (!componentDispatchRecord.dispatchExists(component[i])) {
                        componentDispatchRecord.createRecord(component[i], o);
                        stringToFunction(component[i], window, options);
                    }
                }
            }
        }
    };

};


// EXAMPLES
var Examples = {
        buildClassString: function (elem, newClass) {
            if (elem.hasAttribute('class')) {
                return newClass + ' ' + elem.getAttribute('class');
            }
            return newClass;
        },
        addClass: function (componentData) {
            var elem = componentData.dataComponentCaller,
                newClass = componentData.class,
                _this = this,
                cbTimer = setTimeout(function () {
                    _this.displayClassName(componentData);
                }, 0);
            elem.setAttribute('class', this.buildClassString(elem, newClass));
        },
        displayClassName: function (componentData) {
            var elem = componentData.dataComponentCaller,
                classNameSelector = componentData.classNameTextSelector,
                classNameElem = elem.querySelector(classNameSelector);
            classNameElem.innerHTML = elem.getAttribute('class');
        },
        addShadow: function (componentData) {
            console.log('addShadow');
            var elem = componentData.dataComponentCaller;
            elem.setAttribute('class', this.buildClassString(elem, 'addShadow'));
        }
    },
    componentdispatcher = new ComponentDispatcher();

componentdispatcher.componentDispatch();
