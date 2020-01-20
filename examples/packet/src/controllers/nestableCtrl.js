'use strict';
/** 
  * controllers for angular-nestable 
  * Angular module for jQuery nestable plugin
*/
app.controller('nestableCtrl', ["$scope", function ($scope) {
    $scope.mdl = [{
        item: {
            text: 'Products'
        },
        children: [{
            item: {
                text: 'Features'
            },
            children: []
        }, {
            item: {
                text: 'Gallery'
            },
            children: []
        }, {
            item: {
                text: 'Plans'
            },
            children: [{
                item: {
                    text: 'Purchase'
                },
                children: []
            }, {
                item: {
                    text: 'Confirmation'
                },
                children: []
            }]
        }]
    }, {
        item: {
            text: 'About Us'
        },
        children: [{
            item: {
                text: 'Executive Team'
            },
            children: []
        }, {
            item: {
                text: 'Corporate Responsibility'
            },
            children: []
        }]
    }, {
        item: {
            text: 'Careers'
        },
        children: [{
            item: {
                text: 'Search Jobs'
            },
            children: []
        }, {
            item: {
                text: 'Events'
            },
            children: []
        }]
    }, {
        item: {
            text: 'Contact Us'
        },
        children: []
    }];
}]);
