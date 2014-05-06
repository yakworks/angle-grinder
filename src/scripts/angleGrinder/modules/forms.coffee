forms = angular.module("angleGrinder.forms", [
  "ui.bootstrap"
  "angleGrinder.common"
])

# Override html template for the angular-ui/bootstrap pagination
# to make it backward compatible with bootstrap 2.x
forms.run [
  "$templateCache", ($templateCache) ->
    $templateCache.put "template/pagination/pagination.html",
                       """
      <div class="pagination">
        <ul>
          <li ng-class="{disabled: noPrevious(), previous: align}">
            <a href ng-click="selectPage(page - 1)">{{getText('previous')}}</a>
          </li>

          <li ng-repeat="page in pages" ng-class="{active: page.active, disabled: page.disabled}">
            <a ng-click="selectPage(page.number)">{{page.text}}</a>
          </li>

          <li ng-class="{disabled: noNext(), next: align}">
            <a href ng-click="selectPage(page + 1)">{{getText('next')}}</a>
          </li>
        </ul>
      </div>
    """
]
