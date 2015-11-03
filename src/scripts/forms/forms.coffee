# Here be dragons. Decorate `daypickerDirective`.
angular.module("ui.bootstrap.datepicker").config [
  "$provide", ($provide) ->
    $provide.decorator "daypickerDirective", ["$delegate", ($delegate) ->
      directive = $delegate[0]

      oldCompile = directive.compile
      directive.compile = ->
        link = oldCompile.apply(this, arguments)

        (scope) ->
          link.apply(this, arguments)

          scope.$watch "rows", ->

            angular.forEach scope.rows, (row) ->
              if _.every(row, (dt) -> dt.secondary)
                _.map(row, (dt) -> dt.hide = true)

      return $delegate
    ]
]

forms = angular.module("angleGrinder.forms", [
  "ui.bootstrap.collapse"
  "ui.bootstrap.accordion"
  "ui.bootstrap.alert"
  "ui.bootstrap.buttons"
  "ui.bootstrap.carousel"
  "ui.bootstrap.dateparser"
  "ui.bootstrap.position"
  "ui.bootstrap.dropdown"
  "ui.bootstrap.stackedMap"
  "ui.bootstrap.modal"
  "ui.bootstrap.pagination"
  "ui.bootstrap.progressbar"
  "ui.bootstrap.rating"
  "ui.bootstrap.tabs"


  "xeditable"
  "angleGrinder.common"
  "angleGrinder.alerts"
])

forms.run [
  "$templateCache", ($templateCache) ->

    # Override html template for the angular-ui/bootstrap pagination
    # to make it backward compatible with bootstrap 3.x

    $templateCache.put "template/pagination/pagination.html",
      """
          <ul class="pagination">
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
      """

    $templateCache.put 'tooltip/tooltip.tpl.html',
                       """
        <div class="tooltip in" ng-show="title">
          <div class="tooltip-arrow"></div>
          <div class="tooltip-inner" ng-bind="title"></div>
        </div>
      """
    $templateCache.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n' + '  <a href ng-click="select()" uib-tab-heading-transclude>{{heading}}</a>\n' + "</li>\n" + "")
    $templateCache.put("template/tabs/tabset.html", "<div>\n" + "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" + '  <div class="tab-content">\n' + '    <div class="tab-pane" \n' + '         ng-repeat="tab in tabs" \n' + '         ng-class="{active: tab.active}"\n' + '         uib-tab-content-transclude="tab">\n' + "    </div>\n" + "  </div>\n" + "</div>\n" + "")
    $templateCache.put("template/modal/backdrop.html", '<div uib-modal-animation-class="fade"\n' + '     modal-in-class="in"\n' + "     ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"\n" + "></div>\n" + "")
    $templateCache.put("template/modal/window.html", '<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"\n' + '    uib-modal-animation-class="fade"\n' + '    modal-in-class="in"\n' + "    ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\">\n" + '    <div class="modal-dialog" ng-class="size ? \'modal-\' + size : \'\'"><div class="modal-content" uib-modal-transclude></div></div>\n' + "</div>\n" + "")
]
