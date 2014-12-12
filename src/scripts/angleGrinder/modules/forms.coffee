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
  "ui.bootstrap"
  "xeditable"
  "angleGrinder.common"
])

forms.run [
  "datepickerConfig", "datepickerPopupConfig",
  (datepickerConfig, datepickerPopupConfig) ->
    datepickerConfig.showWeeks = false
    datepickerConfig.formatDay = "d"

    datepickerPopupConfig.showButtonBar = false
]

forms.run [
  "$templateCache", ($templateCache) ->

    # Override html template for the angular-ui/bootstrap pagination
    # to make it backward compatible with bootstrap 2.x

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

    # Override html templates for the angular-ui/bootstrap datepicker

    $templateCache.put "template/datepicker/day.html",
      """
        <table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">
          <thead>
            <tr>
              <th style="cursor: pointer;" ng-click="move(-1)"><span tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></span></th>
              <th style="cursor: pointer;" ng-click="toggleMode()" colspan="{{5 + showWeeks}}">
                <span id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></span>
              </th>
              <th style="cursor: pointer;" ng-click="move(1)"><span tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></span></th>
            </tr>
            <tr>
              <th ng-show="showWeeks" class="text-center"></th>
              <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="row in rows track by $index">
              <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>

              <td ng-hide="dt.hide" style="width: 30px; cursor: pointer;" ng-click="select(dt.date)" ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">
                <span ng-class="{'label label-info': dt.selected, 'label label-default': isActive(dt), 'muted': dt.secondary, 'text-info': dt.current}"
                      ng-disabled="dt.disabled" tabindex="-1">
                  {{dt.label}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      """

    $templateCache.put "template/datepicker/month.html",
      """
        <table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">
          <thead>
            <tr>
              <th style="cursor: pointer;" ng-click="move(-1)"><span tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></span></th>
              <th style="cursor: pointer;" ng-click="toggleMode()"><span id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></span></th>
              <th style="cursor: pointer;" ng-click="move(1)"><span tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></span></th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="row in rows track by $index">
              <td style="width: 100px; cursor: pointer;" ng-click="select(dt.date)" ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">
                <span ng-class="{'label label-info': dt.selected, 'label label-default': isActive(dt), 'text-info': dt.current}"
                      ng-disabled="dt.disabled" tabindex="-1">
                  {{dt.label}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      """

    $templateCache.put "template/datepicker/year.html",
      """
        <table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">
          <thead>
            <tr>
              <th style="cursor: pointer;" ng-click="move(-1)"><span tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></span></th>
              <th style="cursor: pointer;" ng-click="toggleMode()" colspan="3"><span id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></span></th>
              <th style="cursor: pointer;" ng-click="move(1)"><span tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></span></th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="row in rows track by $index">
              <td style="width: 50px; cursor: pointer;" ng-click="select(dt.date)" ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">
                <span ng-class="{'label label-info': dt.selected, 'label label-default': isActive(dt), 'text-info': dt.current}"
                      ng-disabled="dt.disabled" tabindex="-1">
                  {{dt.label}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      """
]
