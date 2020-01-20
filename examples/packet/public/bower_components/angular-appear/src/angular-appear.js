/**
 * [angular-appear]{@link https://github.com/emn178/angular-appear}
 *
 * @version 0.1.2
 * @author Yi-Cyuan Chen [emn178@gmail.com]
 * @copyright Yi-Cyuan Chen 2014-2016
 * @license MIT
 */
(function (angular, $) {
  var PREFIX = '';
  var ngAppear = angular.module('ngAppear', []);
  ['appear', 'disappear', 'appearing'].forEach(function (eventName) {
    var directiveName = 'ng' + eventName.substring(0,1).toUpperCase() + eventName.substring(1);
    ngAppear.directive(directiveName, ['$parse', function ($parse) {
      return {
        restrict: 'A',
        compile: function ($element, attr) {
          var fn = $parse(attr[directiveName]);
          return function ngEventHandler(scope, element) {
            element.on(PREFIX + eventName, function (event) {
              scope.$apply(function () {
                fn(scope, {$event: event});
              });
            });
          };
        }
      };
    }]);
  });

  var setEventPrefix = $.appear.setEventPrefix;
  if (setEventPrefix) {
    $.appear.setEventPrefix = function (prefix) {
      PREFIX = prefix;
      setEventPrefix(prefix);
    };
  }
})(angular, jQuery);
