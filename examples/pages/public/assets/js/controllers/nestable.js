'use strict';

// https://github.com/kamilkp/ng-nestable

/* Controllers */

angular.module('app', ['ng-nestable'])
    // Chart controller 
    .controller('NestableCtrl', ['$scope', function($scope) {


        $scope.items = [{
            item: "Item 1", // this object will be referenced as the $item on scope
            children: []
        }, {
            item: "Item 2",
            children: [{
                item: "Item 3",
                children: []
            },{
                item: "Item 4",
                children: []
            }]
        }, {
            item: "Item 5",
            children: []
        }];


    }]);