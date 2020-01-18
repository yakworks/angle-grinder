/* ============================================================
 * Directive: pgDropdown
 * Prepare Bootstrap dropdowns to match Pages theme
 * ============================================================ */

angular.module('app')
    .directive('pgDropdown', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var btn = $(element).find('.dropdown-menu').siblings('.dropdown-toggle');
                var offset = 0;

                var padding = btn.actual('innerWidth') - btn.actual('width');
                var menuWidth = $(element).find('.dropdown-menu').actual('outerWidth');

                if (btn.actual('outerWidth') < menuWidth) {
                    btn.width(menuWidth - offset);
                    $(element).find('.dropdown-menu').width(btn.actual('outerWidth'));
                } else {
                    $(element).find('.dropdown-menu').width(btn.actual('outerWidth'));
                }

            }
        }
    });