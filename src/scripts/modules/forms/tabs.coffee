forms = angular.module("angleGrinder.forms")

forms.directive "agTabset", ->
  restrict: "E"
  replace: true
  transclude: true

  controller: [
    "$scope", ($scope) ->
      # an array for tabs
      $scope.tabs = []

      # return the current template url
      $scope.currentTemplateUrl = ->
        selectedTab = _.findWhere($scope.tabs, selected: true)
        selectedTab.templateUrl if selectedTab?

      # activate the given tab
      @selectTab = (tab) ->
        # de-select all tabs
        angular.forEach $scope.tabs, (tab) -> tab.selected = false

        # mark the current tab as selected
        tab.selected = true

      # add new tab to the stack
      @addTab = (tab, select = false) ->
        # add a tab to the stack
        $scope.tabs.push(tab)
        # if the tab is first mark it as selected
        @selectTab(tab) if select or $scope.tabs.length is 1

      return
  ]

  template: """
    <div class="container">
      <div class="nav nav-tabs" ng-transclude></div>
      <div class="tab container"><ng-include src="currentTemplateUrl()"></ng-include></div>
    </div>
  """

forms.directive "agTab", [
  "$parse", ($parse) ->
    restrict: "E"
    replace: true
    require: "^agTabset"
    transclude: true

    scope: templateUrl: "@"

    link: (scope, element, attrs, tabsetCtrl) ->
      # by default all new tabs are unselected
      scope.selected = false

      # add the current tab to the stack
      initiallyActived = $parse(attrs.active)(scope)
      tabsetCtrl.addTab(scope, initiallyActived)

      # handles mouse click on the tab
      scope.select = -> tabsetCtrl.selectTab(scope)

    template: """
      <li ng-click="select()" ng-class="{active: selected}">
        <a href="" ng-transclude>{{heading}}</a>
      </li>
    """
]
