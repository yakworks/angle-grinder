/* ============================================================
 * Directive: csSelect
 * AngularJS directive for SelectFx jQuery plugin
 * https://github.com/codrops/SelectInspiration
 * ============================================================ */

angular.module('app')
    .directive('csSelect', function() {
        return {
            restrict: 'A',
            link: function(scope, el, attrs) {
                if (!window.SelectFx) return;

                var el = $(el).get(0);
                $(el).wrap('<div class="cs-wrapper"></div>');
                new SelectFx(el);

            }
        };
    });