'use strict';
/** 
  * Returns the id of the selected e-mail. 
*/
app.directive('messageItem', ['$location', function ($location) {
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs) {
            elem.on("click tap", function (e) {
                var id = attrs.messageItem;
            });
        }
    };
}]);
