app = angular.module "angleGrinder.common"

app.directive "menuItem", [
  "$route", ($route) ->
    restrict: "E"
    transclude: true
    replace: true
    scope: true

    link: (scope, element, attrs) ->
      scope.href = "#/" + attrs.for
      parent = element.parent()
      listIcon = parent[0].attributes["list-icon"].value if parent[0].attributes["list-icon"]?
      scope.icon = attrs.icon || listIcon || "fa fa-circle"
      scope.isActive = -> $route.current?.page is attrs.for

    template: """
      <li ng-class="{ active: isActive() }">
        <a href="{{href}}">
          <i class="{{icon}}"></i>
            <span ng-transclude></span>
          </a>
      </li>
    """
]

class MenuCtrl extends BaseCtrl

  @register app, "angleGrinder.common.MenuCtrl"
  @inject "$scope"

  initialize: ->
    @status = {}
    @$scope.$on "$routeChangeSuccess", (event, currentRoute) =>
      @status[currentRoute.section] = true
