/* ============================================================
 * Directive: pgSearch
 * AngularJS directive for Pages Overlay Search jQuery plugin
 * ============================================================ */

angular.module('app')
    .directive('pgSearch', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).search();

                scope.$on('toggleSearchOverlay', function(scopeDetails, status) {
                    if(status.show){
                        $(element).data('pg.search').toggleOverlay('show');
                    } else {
                        $(element).data('pg.search').toggleOverlay('hide');
                    }
                })

            }
        }
    }]);