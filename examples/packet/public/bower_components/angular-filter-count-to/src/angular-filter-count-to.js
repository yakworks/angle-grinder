angular.module('ngCountTo', [])
    .directive('ngCountTo', ['$filter', '$timeout', function ($filter, $timeout) {
        return {
            replace: false,
            scope: true,
            link: function (scope, element, attrs) {

                var e = element[0];
                var num, refreshInterval, duration, steps, step, ngCountTo, value, increment;

                var calculate = function () {
                    refreshInterval = 30;
                    step = 0;
                    scope.timoutId = null;
                    scope.filter = attrs.filter;
                    scope.fractionSize = attrs.fractionSize ? attrs.fractionSize : 0;
                    scope.params = attrs.params ? attrs.params : scope.fractionSize;
                    ngCountTo = parseFloat(attrs.ngCountTo) || 0;
                    scope.value = parseFloat(attrs.value, 10) || 0;
                    duration = (parseFloat(attrs.duration) * 1000) || 0;

                    steps = Math.ceil(duration / refreshInterval);
                    increment = ((ngCountTo - scope.value) / steps);
                    num = scope.value;
                }

                var tick = function () {
                    scope.timoutId = $timeout(function () {
                        num += increment;
                        step++;
                        if (step >= steps) {
                            $timeout.cancel(scope.timoutId);
                            num = ngCountTo;
                            e.textContent = scope.filter ? $filter(scope.filter)(ngCountTo, scope.params, scope.fractionSize) : Math.round(ngCountTo);
                        } else {
                            e.textContent = scope.filter ?  $filter(scope.filter)(num, scope.params, scope.fractionSize) : Math.round(num);
                            tick();
                        }
                    }, refreshInterval);

                }

                var start = function () {
                    if (scope.timoutId) {
                        $timeout.cancel(scope.timoutId);
                    }
                    calculate();
                    tick();
                }

                attrs.$observe('ngCountTo', function (val) {
                    if (val) {
                        start();
                    }
                });

                attrs.$observe('value', function (val) {
                    start();
                });

                return true;
            }
        }

    }]);
