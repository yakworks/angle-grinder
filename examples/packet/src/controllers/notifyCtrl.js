'use strict';
/**
 * controller for Ng-notify
 */
app.controller('NgNotifyDemoCtrl', ['$scope', 'ngNotify',
function ($scope, ngNotify) {
    $scope.notify = {
        theme: 'pure',
        position: 'top',
        duration: 3000,
        type: 'default',
        sticky: 'false',
        button: 'true',
        html: 'false',
        text: 'Message'
    };
    $scope.set = function () {
        ngNotify.set($scope.notify.text, {
            theme: $scope.notify.theme,
            position: $scope.notify.position,
            duration: $scope.notify.duration,
            type: $scope.notify.type,
            sticky: $scope.notify.sticky,
            button: $scope.notify.button,
            html: $scope.notify.html
        });
    };
}]);