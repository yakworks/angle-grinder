forms = angular.module("angleGrinder.forms")

forms.directive "agTabset", ->
  restrict: "E"
  replace: true
  transclude: true
  scope: true

  controller: [
    "$log", "$scope", ($log, $scope) ->

      # stack of the tabs
      $scope.tabs = []

      # show or hide the tab content loading indicator
      $scope.contentLoading = false

      # return the current tab
      $scope.currentTab = ->
        _.findWhere($scope.tabs, selected: true)

      # return the current template url
      $scope.currentTemplateUrl = ->
        currentTab = $scope.currentTab()
        currentTab.tplSrc if currentTab

      # evaluates when a new tab content is loaded
      $scope.contentLoaded = ->
        # hide contant loading indication
        $scope.contentLoading = false

        # hide tab loading spinner
        tab = $scope.currentTab()
        tab.loading = false

        $log.debug "[tabs] content loaded", tab

      # activate the given tab
      @selectTab = (tab) ->
        # de-select all tabs
        angular.forEach $scope.tabs, (tab) ->
          tab.selected = tab.loading = false

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
                    onload="contentLoaded()"
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
        return if scope.selected
        tabsetCtrl.selectTab(scope)

    template: """
      <li ng-click="select()" ng-class="{active: selected, loading: loading}">
        <a href="" ng-transclude>{{heading}}</a>
      </li>
    """
]
