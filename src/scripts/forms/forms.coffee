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
  "ui.bootstrap.tpls"
  "ui.bootstrap.tooltip"
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
]


forms.config [ "$provide", ($provide) ->

    #Decorate select tags, wrap inside 'select-wrapper' so we can add dropdown arrow to standard html selects
    $provide.decorator "selectDirective", ["$delegate", ($delegate) ->
      directive = $delegate[0]
      link = directive.link

      directive.compile = (element, attrs) ->

        return {
          post: (scope, element, attrs, ctrl) ->
            #Add wrapper, if its not already wrapped and its not a select2-wrapper.
            if( not (element.parent().attr('class') == 'select-wrapper') and element.attr('ui-select2') == undefined )
              template = angular.element("<div class='select-wrapper'></div>")
              element.wrap(template)

            link(scope, element, attrs, ctrl)
        }

      return $delegate
    ]
]
