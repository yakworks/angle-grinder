'use strict';
/** 
  * controller for angular-ladda
  * An angular directive wrapper for Ladda buttons.
*/
app.controller('LaddaCtrl', ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.ldloading = {};
    $scope.clickBtn = function (style) {
        $scope.ldloading[style.replace('-', '_')] = true;
        $timeout(function () {
            $scope.ldloading[style.replace('-', '_')] = false;
        }, 2000);
    };
    $scope.clickProgressBtn = function (style) {
        $scope.ldloading[style.replace('-', '_') + "_progress"] = true;
        $timeout(function () {
            $scope.ldloading[style.replace('-', '_') + "_progress"] = 0.1;
        }, 500);
        $timeout(function () {
            $scope.ldloading[style.replace('-', '_') + "_progress"] += 0.1;
        }, 1000);
        $timeout(function () {
            $scope.ldloading[style.replace('-', '_') + "_progress"] += 0.1;
        }, 1500);
        $timeout(function () {
            $scope.ldloading[style.replace('-', '_') + "_progress"] = false;
        }, 2000);
    };
}]);