'use strict';
/** 
  * A directive used for "close buttons" (eg: alert box).
  * It hides its parent node that has the class with the name of its value.
*/
app.directive('ctDismiss', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.on('click', function (e) {
                elem.parent('.' + attrs.ctDismiss).hide();
                e.preventDefault();
            });

        }
    };
});