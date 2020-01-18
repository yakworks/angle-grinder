'use strict';

/* Controllers */

angular.module('app')

.controller('SearchCtrl', ['$scope', function($scope) {
    $scope.liveSearch = function() {
        console.log("Live search for: " + $scope.search.query);
    }


}]);