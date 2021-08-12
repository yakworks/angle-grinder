angular.module('uib/template/tabs/tab.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('uib/template/tabs/tab.html',
    `<li class="uib-tab" ng-class="[{'is-active': active, disabled: disabled}, classes]">
        <a href ng-click="select($event)" class="nav-link" uib-tab-heading-transclude>{{heading}}</a>
    </li>`
  )
}])
