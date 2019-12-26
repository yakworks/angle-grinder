/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common");

app.provider('RoutesServ', [
  '$routeProvider',
  'ResourceTemplateServ',
  function($routeProvider, ResourceTemplateServ) {
    return {
      'setRoutes'(path) {
        this.setOtherwise(path.otherwise);
        const self = this;
        return _.forEach(path, (v, k) => _.forEach(v, (data, url) => $routeProvider.when(url, {
          templateUrl: ResourceTemplateServ('/' + k, data.page),
          controller: self.getControllerName(data)
        }
        )));
      },
      getControllerName(data) {
        if (data.controller !== undefined) {
          return data.controller;
        } else {
          return data.page.charAt(0).toUpperCase() + data.page.slice(1) + 'Ctrl';
        }
      },
      'setOtherwise'(url) {
        if (url == null) { url = '/'; }
        return $routeProvider.otherwise({redirectTo: url});
      },
      '$get'() {}
    };
  }
]);
