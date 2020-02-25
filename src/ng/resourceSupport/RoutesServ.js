import angular from 'angular'
import resourceModule from './resourceModule'

var app = angular.module(resourceModule)

app.provider('RoutesServ', [
  '$routeProvider',
  'ResourceTemplateServ',
  function($routeProvider, ResourceTemplateServ) {
    return {
      'setRoutes'(path) {
        this.setOtherwise(path.otherwise)
        const self = this
        return _.forEach(path, (v, k) => _.forEach(v, (data, url) => $routeProvider.when(url, {
          templateUrl: ResourceTemplateServ('/' + k, data.page),
          controller: self.getControllerName(data)
        }
        )))
      },
      getControllerName(data) {
        if (data.controller !== undefined) {
          return data.controller
        } else {
          return data.page.charAt(0).toUpperCase() + data.page.slice(1) + 'Ctrl'
        }
      },
      'setOtherwise'(url) {
        if (url == null) { url = '/' }
        return $routeProvider.otherwise({ redirectTo: url })
      },
      '$get'() {}
    }
  }
])
