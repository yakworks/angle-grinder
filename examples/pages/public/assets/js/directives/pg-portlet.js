/* ============================================================
 * Directive: pgPortlet
 * AngularJS directive for Pages Portlets jQuery plugin
 * ============================================================ */

angular.module('app')
    .directive('pgPortlet', ['$parse', function($parse) {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element, attrs) {

                var onRefresh = $parse(attrs.onRefresh);

                var options = {};

                if (attrs.progress) options.progress = attrs.progress;
                if (attrs.overlayOpacity) options.overlayOpacity = attrs.overlayOpacity;
                if (attrs.overlayColor) options.overlayColor = attrs.overlayColor;
                if (attrs.progressColor) options.progressColor = attrs.progressColor;
                if (attrs.onRefresh) options.onRefresh = function() {
                    onRefresh(scope);
                };

                element.portlet(options);

            }
        }
    }]);