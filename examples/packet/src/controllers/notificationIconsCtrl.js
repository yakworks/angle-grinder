'use strict';
/**
 * controller for ngImgCrop
 * Simple Image Crop directive for AngularJS.
 */
app.controller('NotificationIconsCtrl', ["$scope", "$interval",
function ($scope, $interval) {

    var autoCounter = function (index, start, steps, delay) {
        var numIterations = 0;
        $scope.autoPending[index] = start;
        $interval(function () {
            if (++numIterations > steps) {
                $scope.autoPending[index] = start;
                numIterations = 0;
            } else {
                $scope.autoPending[index] = $scope.autoPending[index] + 1;
            }
        }, delay);
    };

    $scope.autoPending = [0, 0];
    autoCounter(0, 1, 4, 1000);
    autoCounter(1, 98, 4, 1000);
}]);