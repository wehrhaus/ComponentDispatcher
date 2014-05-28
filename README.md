# ComponentDispatcher

Uses the html `data-component` attribute to dispatch JavaScript methods.

An optional `data-component-options` attribute can be used to send JSON data to the method

The DOM element that dispatched the call will always be sent as `dataComponentCaller`
*See the examples below for details.*

## Usage

1. Namespaced
    * HTML

            <div data-component="Foo.Bar.foo" class="bar">...</div>

    * JavaScript

            var Foo = {
                  Bar: {
                    foo: function (componentData) {
                      var caller = componentData.dataComponentCaller;
                      return caller.getAttribute('class'); //=> 'bar'
                    };
                  }
                };

2. Function
    * HTML

            <div data-component="foo" class="bar">...</div>

    * JavaScript

            var foo = function () {
              var data = arguments[0];
              return data.dataComponentCaller.getAttribute('class'); //=> 'bar'
            };

3. Multiple Calls
    * HTML

            <div data-component="Foo.bar getClass" class="bar">...</div>

    * JavaScript

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
