angular.module('angular-simple-sidebar', [])
  .directive('angularSimpleSidebar', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        items: '=',
        state: '=',
        title: '=',
        settings: '=',
      },
      template: '' +
        '<div class="ass-menu-button" title="{{::title}}" ng-click="openSidebar()">' +
        '<i class="fa fa-bars fa-2x"></i>' +
        '</div>' +
        '<div title="">' +
        '<aside class="ass-aside-menu ass-slide-{{slide}}">' +
        '<small ng-if="settings.close" class="ass-aside-menu-close" ng-click="closeSidebar()">' +
        '<span ng-if="!settings.closeIcon">[x]</span>' +
        '<span ng-if="settings.closeIcon"><i class="{{::settings.closeIcon}}"></i></span>' +
        '</small>' +
        '<h3 class="ass-aside-menu-title" ng-bind="::title"></h3>' +
        '<a href="{{::item.link}}" target="{{::item.target}}" ng-click="closeSidebar()" class="ass-aside-menu-item" ng-repeat="item in items">' +
        '<i ng-if="::item.icon" class="{{::item.icon}} ass-aside-menu-icon"></i>{{::item.name}}</a>' +
        '</aside>' +
        '<div ng-if="state" class="ass-aside-overlay" ng-click="closeSidebar()"></div>' +
        '</div>' +
        '',
      link: function (scope, element, attrs) {
        scope.slide;
        if (scope.state) {
          scope.slide = 'in';
        }

        scope.openSidebar = function () {
          scope.state = true;
          scope.slide = 'in';
        }

        scope.closeSidebar = function () {
          scope.state = false;
          scope.slide = 'out';
        }
      }
    };
  });
