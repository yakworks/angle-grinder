'use strict';

/* Controllers */

angular.module('app')
    .controller('NotificationCtrl', ['$scope', function($scope) {
        $scope.notification = {};
        $scope.notification.type = 'bar';
        $scope.notification.position = 'top';

        $scope.showNotification = function() {
            var message = $scope.notification.message; // Message to display inside the notification
            var color = $scope.notification.color; // Info, Success, Error etc
            var position = $scope.notification.position; // Placement of the notification

            switch ($scope.notification.type) {
                case 'bar':
                    // Show an bar notification attached to top and bottom of the screen
                    $('body').pgNotification({
                        style: 'bar',
                        message: message,
                        position: position,
                        timeout: 0,
                        type: color
                    }).show();
                    break;
                case 'flip':
                    // Show a flipping notification animated
                    // using CSS3 transforms and animations
                    $('body').pgNotification({
                        style: 'flip',
                        message: message,
                        position: position,
                        timeout: 0,
                        type: color
                    }).show();
                    break;
                case 'circle':
                    // Slide-in a circle notification from sides
                    // You have to provide the HTML for thumbnail 
                    $('body').pgNotification({
                        style: 'circle',
                        title: 'John Doe',
                        message: message,
                        position: position,
                        timeout: 0,
                        type: color,
                        thumbnail: '<img width="40" height="40" style="display: inline-block;" src="assets/img/profiles/avatar2x.jpg" data-src="assets/img/profiles/avatar.jpg" ui-jq="unveil" data-src-retina="assets/img/profiles/avatar2x.jpg" alt="">'
                    }).show();
                    break;
                case 'simple':
                    // Simple notification having bootstrap's .alert class
                    $('body').pgNotification({
                        style: 'simple',
                        message: message,
                        position: position,
                        timeout: 0,
                        type: color
                    }).show();
                    break;
            }

        }

        $scope.setType = function(type) {
            $scope.notification.type = type;
            if (type == 'bar') {
                $scope.notification.position = 'top';
            } else {
                $scope.notification.position = 'top-right';
            }
        }
        $scope.setPosition = function(position, $event) {
            $scope.notification.position = position;
        }

    }]);