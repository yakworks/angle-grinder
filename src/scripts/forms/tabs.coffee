forms = angular.module("angleGrinder.forms")

forms.directive "agTabset", [
  "$parse", "$q",
  ($parse, $q) ->

    restrict: "E"
    replace: true
    transclude: true
    scope: true
    require: "agTabset"

    controller: [
      "$log", "$scope", "$location",
      ($log, $scope, $location) ->

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
          # hide content loading indication
          $scope.contentLoading = false

          # hide tab loading spinner
          tab = $scope.currentTab()
          tab.loading = false

          # update the url
          $location.search("tab", tab.name) if tab.name?

          $log.debug "[tabs] content loaded", tab

        # Open a tab with the given name
        @openTab = (name) ->
          deferred = $q.defer()
          # find the tab by name
          tab = _.findWhere($scope.tabs, { name: name })

          # do nothing when the tab cannot be found
          return deferred.promise unless tab?

          # select the tab unless is not already selected
          @_selectTab(tab) unless tab.selected

          unregister = tab.$watch "loading", (loading) ->
            return if loading # tab is still loading, do nothing

            # requested tab was loaded, handle the promise
            deferred.resolve(tab)
            # ..and unregister the watcher
            unregister()

          deferred.promise

        # activate the given tab
        # @private
        @_selectTab = (tab) ->
          # de-select all tabs
          angular.forEach $scope.tabs, (tab) ->
            tab.selected = tab.loading = false

          # mark the current tab as selected
          tab.selected = true

          # show the loading spinners
          tab.loading = true
          $scope.contentLoading = true

        # add new tab to the stack
        # @private
        @_addTab = (tab, select = false) ->
          # add a tab to the stack
          $scope.tabs.push(tab)

          # if the tab is the first one mark it as selected
          @_selectTab(tab) if select or $scope.tabs.length is 1

        return
    ]

    link: (scope, element, attrs, ctrl) ->
      # publish agTabset controller to the parent scope
      alias = attrs.name
      $parse(alias).assign(scope.$parent, ctrl) if alias

    template: """
      <div class="container no-padding">
        <div class="nav nav-tabs" ng-transclude style="margin-bottom: 15px"></div>
        <div class="tab">
          <span ng-if="contentLoading">loading the content</span>
          <ng-include src="currentTemplateUrl()"
                      onload="contentLoaded()"
                      ng-hide="contentLoading"></ng-include>
        </div>
      </div>
    """
]

forms.directive "agTab", [
  "$log", "$location", "pathWithContext",
  ($log, $location, pathWithContext) ->
    restrict: "E"
    replace: true
    require: "^agTabset"
    transclude: true

    scope:
      # text binding
      templateUrl: "@"
      name: "@"

    link: (scope, element, attrs, tabsetCtrl) ->
      # append the application context to the template url
      scope.tplSrc = pathWithContext(scope.templateUrl)

      # by default all new tabs are unselected
      scope.selected = false
      scope.loading = false

      getTab = -> $location.search().tab

      # add the current tab to the stack
      active = -> scope.name? and getTab() is scope.name
      tabsetCtrl._addTab(scope, active())

      # handles mouse click on the tab
      scope.select = ->
        return if scope.selected
        tabsetCtrl._selectTab(scope)

      scope.$watch getTab, ()->
        scope.select() if angular.isDefined(scope.name) and getTab() is scope.name and not scope.selected
      , true

    template: """
      <li ng-click="select()" ng-class="{active: selected, loading: loading}">
        <a href="" ng-transclude>{{heading}}</a>
      </li>
    """
]
