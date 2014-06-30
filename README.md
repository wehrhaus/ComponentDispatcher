# ComponentDispatcher

Uses the html `data-component` attribute to dispatch JavaScript methods.

An optional `data-component-options` attribute can be used to send JSON data to the method

The DOM element that dispatched the call will always be sent as `dataComponentCaller`
*See the examples below for details.*

**Example:** <a href="http:/componentdispatcher.justinwehrman.com" target="_blank">http:/componentdispatcher.justinwehrman.com</a>

## ModuleDispatcher

If using <a href="http://requirejs.org/" target="_blank">RequireJS</a>, **ModuleDispatcher** can be used.

Uses the html `data-module` attribute to dispatch RequireJS modules.

An optional `data-module-options` attribute can be used to send JSON data to the module

### Usage

1. Namespaced
    * HTML

            <div data-component="Foo.Bar.foo" data-component-options='{"title": "FooBar"}' class="bar">...</div>

    * JavaScript

            <script src="ComponentDispatcher.js"></script>
            <script>
            var Foo = {
                  Bar: {
                    foo: function (componentData) {
                      var caller = componentData.dataComponentCaller;
                      console.log(componentData.title); //=> 'FooBar'
                      return caller.getAttribute('class'); //=> 'bar'
                    };
                  }
                };
            </script>

2. Function
    * HTML

            <div data-component="foo" class="bar">...</div>

    * JavaScript
            <script src="ComponentDispatcher.js"></script>
            <script>
            var foo = function () {
              var data = arguments[0];
              return data.dataComponentCaller.getAttribute('class'); //=> 'bar'
            };
            </script>

3. Multiple Calls
    * HTML

            <div data-component="Foo.bar getClass" class="bar">...</div>

    * JavaScript
            <script src="ComponentDispatcher.js"></script>
            <script>
            var Foo = {
                  bar: function (componentData) {
                    var caller = componentData.dataComponentCaller;
                    return caller.getAttribute('class'); //=> 'bar'
                  };
                },
                getClass = function () {
                  var data = arguments[0];
                  return data.dataComponentCaller.getAttribute('class'); //=> 'bar'
                };
            </script>
