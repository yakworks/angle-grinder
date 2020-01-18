angular.module('app')
    .directive('validateAttachedFormElement', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) {
                    return;
                }

                elm.on('blur', function() {
                    if (ctrl.$invalid && !ctrl.$pristine) {
                        $(elm).popover('show');
                    } else {
                        $(elm).popover('hide');
                    }
                });

                elm.closest('form').on('submit', function() {
                    if (ctrl.$invalid && !ctrl.$pristine) {
                        $(elm).popover('show');
                    } else {
                        $(elm).popover('hide');
                    }
                });

            }
        };
    });