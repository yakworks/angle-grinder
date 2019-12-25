/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const forms = angular.module("angleGrinder.forms");

forms.directive("agTabset", [
  "$parse", "$q",
  ($parse, $q) => ({
    restrict: "E",
    replace: true,
    transclude: true,
    scope: true,
    require: "agTabset",

    controller: [
      "$log", "$scope", "$location",
      function($log, $scope, $location) {

        // stack of the tabs
        $scope.tabs = [];

        // show or hide the tab content loading indicator
        $scope.contentLoading = false;

        // return the current tab
        $scope.currentTab = () => _.find($scope.tabs, {selected: true});

        // return the current template url
        $scope.currentTemplateUrl = function() {
          const currentTab = $scope.currentTab();
          if (currentTab) { return currentTab.tplSrc; }
        };

        // evaluates when a new tab content is loaded
        $scope.contentLoaded = function() {
          // hide content loading indication
          $scope.contentLoading = false;

          // hide tab loading spinner
          const tab = $scope.currentTab();
          tab.loading = false;

          // update the url
          if (tab.name?) { $location.search("tab", tab.name); }

          return $log.debug("[tabs] content loaded", tab);
        };

        // Open a tab with the given name
        this.openTab = function(name) {
          const deferred = $q.defer();
          // find the tab by name
          const tab = _.find($scope.tabs, { name });

          // do nothing when the tab cannot be found
          if (!tab?) { return deferred.promise; }

          // select the tab unless is not already selected
          if (!tab.selected) { this._selectTab(tab); }

          var unregister = tab.$watch("loading", function(loading) {
            if (loading) { return; } // tab is still loading, do nothing

            // requested tab was loaded, handle the promise
            deferred.resolve(tab);
            // ..and unregister the watcher
            return unregister();
          });

          return deferred.promise;
        };

        // activate the given tab
        // @private
        this._selectTab = function(tab) {
          // de-select all tabs
          angular.forEach($scope.tabs, tab => tab.selected = (tab.loading = false));

          // mark the current tab as selected
          tab.selected = true;

          // show the loading spinners
          tab.loading = true;
          return $scope.contentLoading = true;
        };

        // add new tab to the stack
        // @private
        this._addTab = function(tab, select) {
          // add a tab to the stack
          if (select == null) { select = false; }
          $scope.tabs.push(tab);

          // if the tab is the first one mark it as selected
          if (select || ($scope.tabs.length === 1)) { return this._selectTab(tab); }
        };

      }
    ],

    link(scope, element, attrs, ctrl) {
      // publish agTabset controller to the parent scope
      const alias = attrs.name;
      if (alias) { return $parse(alias).assign(scope.$parent, ctrl); }
    },

    template: `\
<div class="no-padding">
  <div class="nav nav-tabs" ng-transclude style="margin-bottom: 15px"></div>
  <div class="tab">
    <span ng-if="contentLoading">loading the content</span>
    <ng-include src="currentTemplateUrl()"
                onload="contentLoaded()"
                ng-hide="contentLoading"></ng-include>
  </div>
</div>\
`
  })
]);

forms.directive("agTab", [
  "$log", "$location", "pathWithContext",
  ($log, $location, pathWithContext) => ({
    restrict: "E",
    replace: true,
    require: "^agTabset",
    transclude: true,

    scope: {
      // text binding
      templateUrl: "@",
      name: "@"
    },

    link(scope, element, attrs, tabsetCtrl) {
      // append the application context to the template url
      scope.tplSrc = pathWithContext(scope.templateUrl);

      // by default all new tabs are unselected
      scope.selected = false;
      scope.loading = false;

      const getTab = () => $location.search().tab;

      // add the current tab to the stack
      const active = () => _.isNil(scope.name) && (getTab() === scope.name);
      tabsetCtrl._addTab(scope, active());

      // handles mouse click on the tab
      scope.select = function() {
        if (scope.selected) { return; }
        return tabsetCtrl._selectTab(scope);
      };

      return scope.$watch(getTab, function(){
        if (angular.isDefined(scope.name) && (getTab() === scope.name) && !scope.selected) { return scope.select(); }
      }
      , true);
    },

    template: `\
<li ng-click="select()" ng-class="{active: selected, loading: loading}">
  <a href="" ng-transclude>{{heading}}</a>
</li>\
`
  })
]);
