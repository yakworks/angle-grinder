angular.module('uib/template/tabs/tabset.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('uib/template/tabs/tabset.html',
    `<div class="bulma">
      <div class="tabs {{tabset.type}}">
        <ul ng-transclude></ul>
      </div>
      <div class="tab-content">
        <div class="tab-pane"
            ng-repeat="tab in tabset.tabs"
            ng-class="{active: tabset.active === tab.index}"
            uib-tab-content-transclude="tab">
        </div>
      </div>
    </div>`
  )
}])
