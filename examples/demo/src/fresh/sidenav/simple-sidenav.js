import './simple-sidenav.css'
// import appState from 'angle-grinder/src/tools/AppState'

export default angular.module('simple-sidebar', [])
  .directive('simpleSidebar', () => ({
    restrict: 'E',
    transclude: true,
    scope: {
      items: '=',
      open: '=',
      title: '=',
      settings: '=',
    },
    template: require('./simple-sidenav.html'),
    link: function (scope, element, attrs) {
      scope.slide;
      if (scope.open ) {
        scope.slide = 'in';
      }

      scope.openSidebar = function () {
        scope.open = true
        scope.slide = 'in';
      }

      scope.closeSidebar = function () {
        scope.open = false
        scope.slide = 'out';
      }
    }
  }))
  .name
