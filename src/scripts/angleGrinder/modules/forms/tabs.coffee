forms = angular.module("angleGrinder.forms")

# This directive will be fired up after the template content is rendered
forms.directive "agTabPostRender", ->
  restrict : "A"
  terminal : true # the last directive to execute

  link: (scope) ->
    parentScope = scope.$parent

    parentScope.contentLoading = false
    parentScope.currentTab().loading = false

forms.directive "agTabset", ->
  restrict: "E"
  replace: true
  transclude: true
  scope: true

  controller: [
    "$scope", ($scope) ->

      # an array for tabs
      $scope.tabs = []

      # show or hide tab content loading indicator
      $scope.contentLoading = false

      # return the current tab
      $scope.currentTab = ->
        _.findWhere($scope.tabs, selected: true)

      # return the current template url
      $scope.currentTemplateUrl = ->
        currentTab = $scope.currentTab()
        currentTab.tplSrc if currentTab

      # activate the given tab
      @selectTab = (tab) ->
        # de-select all tabs
        angular.forEach $scope.tabs, (tab) -> tab.selected = false

        # mark the current tab as selected
        tab.selected = true

        # show the loading spinners
        tab.loading = true
        $scope.contentLoading = true

      # add new tab to the stack
      @addTab = (tab, select = false) ->
        # add a tab to the stack
        $scope.tabs.push(tab)

        # if the tab is the first one mark it as selected
        @selectTab(tab) if select or $scope.tabs.length is 1

      return
  ]

  template: """
    <div class="container">
      <div class="nav nav-tabs" ng-transclude></div>
      <div class="tab container">
        <span ng-if="contentLoading">loading the content</span>
        <ng-include src="currentTemplateUrl()"
                    ag-tab-post-render
                    ng-hide="contentLoading"></ng-include>
      </div>
    </div>
  """

forms.directive "agTab", [
  "$log", "pathWithContext",
  ($log, pathWithContext) ->
    restrict: "E"
    replace: true
    require: "^agTabset"
    transclude: true

    scope:
      templateUrl: "@" # text binding
      active: "&"      # one-way binding

    link: (scope, element, attrs, tabsetCtrl) ->
      # append the application context to the template url
      scope.tplSrc = pathWithContext(scope.templateUrl)

      # by default all new tabs are unselected
      scope.selected = false
      scope.loading = false

      # add the current tab to the stack
      tabsetCtrl.addTab(scope, scope.active())

      # handles mouse click on the tab
      scope.select = ->
        return if scope.selected # TODO spec this case
        tabsetCtrl.selectTab(scope)

    template: """
      <li ng-click="select()" ng-class="{active: selected, loading: loading}">
        <a href="" ng-transclude>{{heading}}</a>
      </li>
    """
]
