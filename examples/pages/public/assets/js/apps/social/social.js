'use strict';

/* Controllers */

angular.module('app')
    // Social controller 
    .controller('SocialCtrl', ['$scope', '$stateParams', '$rootScope', function($scope, $stateParams, $rootScope) {
        // Apply recommended theme for Calendar
        $scope.app.layout.theme = 'pages/css/themes/simple.css';

        // For demo purposes only. Changes the theme back to pages default when switching the state. 
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                $scope.app.layout.theme = 'pages/css/pages.css';
            })

    }]);

/* Directives */

angular.module('app')
    .directive('pgSocial', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var $social = $(element);
                $social.social($social.data());
            }
        }
    });