angular.module('uib/template/popover/popover-html.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('uib/template/popover/popover-html.html',
    '<div class="arrow"></div>\n' +
    '<h3 class="popover-header" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n' +
    '<div class="popover-body" ng-bind-html="contentExp()"></div>\n' +
    '')
}])
