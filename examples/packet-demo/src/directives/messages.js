'use strict';
/**
  * Returns the id of the selected e-mail.
*/
let app = angular.module('app')
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
