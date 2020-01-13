import angular from 'angular'
import agCommon from '../common'
import agSelect2 from '../select2'
import alerts from '../alerts'
import agPathWithContext from '../pathWithContext'
import xeditable from 'angular-xeditable'
import _ from 'lodash'
import 'angular-ui-bootstrap'

const MOD_NAME = 'angleGrinder.forms'
export default MOD_NAME
var forms = angular.module(MOD_NAME, [
  'ui.bootstrap.collapse',
  'ui.bootstrap.accordion',
  'ui.bootstrap.alert',
  'ui.bootstrap.buttons',
  'ui.bootstrap.carousel',
  'ui.bootstrap.dateparser',
  'ui.bootstrap.position',
  'ui.bootstrap.dropdown',
  'ui.bootstrap.stackedMap',
  'ui.bootstrap.modal',
  'ui.bootstrap.pagination',
  'ui.bootstrap.progressbar',
  'ui.bootstrap.rating',
  'ui.bootstrap.tabs',
  'ui.bootstrap.tpls',
  'ui.bootstrap.tooltip',
  xeditable,
  agPathWithContext,
  agCommon,
  agSelect2,
  alerts
])

forms.run([
  '$templateCache', function($templateCache) {
    // Override html template for the angular-ui/bootstrap pagination
    // to make it backward compatible with bootstrap 3.x

    $templateCache.put('template/pagination/pagination.html',
      `\
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
</ul>\
`
    )

    return $templateCache.put('tooltip/tooltip.tpl.html',
      `\
<div class="tooltip in" ng-show="title">
  <div class="tooltip-arrow"></div>
  <div class="tooltip-inner" ng-bind="title"></div>
</div>\
`
    )
  }
])

forms.config(['$provide', $provide => // Decorate select tags, wrap inside 'select-wrapper' so we can add dropdown arrow to standard html selects
  $provide.decorator('selectDirective', ['$delegate', function($delegate) {
    const directive = $delegate[0]
    const {
      link
    } = directive

    directive.compile = (element, attrs) => ({
      pre(scope, element, attrs, ctrl) {
        if (_.isFunction(link.pre)) { return link.pre(scope, element, attrs, ctrl) }
      },

      post(scope, element, attrs, ctrl) {
        // Add wrapper, if its not already wrapped and its not a select2-wrapper.
        if (!(element.parent().attr('class') === 'select-wrapper') && (element.attr('ui-select2') === undefined)) {
          const template = angular.element("<div class='select-wrapper'></div>")
          element.wrap(template)
        }

        if (_.isFunction(link.post)) { return link.post(scope, element, attrs, ctrl) }
      }
    })

    return $delegate
  }
  ])
])

// TODO: refactor, can cause errors swallowing
forms.config(['$qProvider', $qProvider => $qProvider.errorOnUnhandledRejections(false)
])
