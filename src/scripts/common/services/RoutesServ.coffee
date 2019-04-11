app = angular.module "angleGrinder.common"

app.provider 'RoutesServ', [
  '$routeProvider'
  'ResourceTemplateServ'
  ($routeProvider, ResourceTemplateServ) ->
    {
      'setRoutes': (path) ->
        @setOtherwise path.otherwise
        self = this
        _.forEach path, (v, k) ->
          _.forEach v, (data, url) ->
            $routeProvider.when url,
              templateUrl: ResourceTemplateServ('/' + k, data.page)
              controller: self.getControllerName(data)
      getControllerName: (data) ->
        if data.controller != undefined
          data.controller
        else
          data.page.charAt(0).toUpperCase() + data.page.slice(1) + 'Ctrl'
      'setOtherwise': (url= '/') ->
        $routeProvider.otherwise redirectTo: url
      '$get': ->
    }
]
