// EXAMPLES
var examples = {
    buildClassString: function (elem, newClass) {
        if (elem.hasAttribute('class')) {
            return newClass + ' ' + elem.getAttribute('class');
        }
        return newClass;
    },
    addClass: function (componentData) {
        var elem = componentData.dataComponentCaller,
            newClass = componentData.class;
        elem.setAttribute('class', this.buildClassString(elem, newClass));
    },
    addShadow: function (componentData) {
        var elem = componentData.dataComponentCaller;
        elem.setAttribute('class', this.buildClassString(elem, 'addShadow'));
    }
};
