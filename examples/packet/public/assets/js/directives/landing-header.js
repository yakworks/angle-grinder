'use strict';
app.directive('landingHeader', function ($window) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attributes) {
            angular.element($window).bind("scroll", function () {
                if (this.pageYOffset >= 60) {
                    $element.addClass('min');
                } else {
                    $element.removeClass('min');
                }
            });

        }
    };
});
