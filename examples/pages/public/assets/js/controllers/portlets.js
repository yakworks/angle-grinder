'use strict';

/* Controllers */

angular.module('app')
    .controller('PortletCtrl', ['$scope', '$timeout', function($scope, $timeout) {

        $scope.refreshTest = function(portlet) {
            console.log("Refreshing...");
            // Timeout to simulate AJAX response delay
            $timeout(function() {
                $(portlet).portlet({
                    refresh: false
                });
            }, 2000);

        }

        $scope.refreshWithErrorTest = function(portlet) {
            console.log("Refreshing...");
            // Timeout to simulate AJAX response delay
            $timeout(function() {
                $(portlet).portlet({
                    error: "Something went terribly wrong!"
                });
            }, 2000);

        }


    }]);
