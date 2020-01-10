/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Adds button for editable form to make the form visable
var app = angular.module('angleGrinder.forms')

app.directive('editablePanelHeading', [
  () => ({
    restrict: 'A',
    transclude: true,
    replace: true,

    scope: { form: '=editablePanelHeading' },

    template: `\
<div class="panel-heading">
  <h4 class="panel-title">
    <span ng-transclude></span>
    <a href="" class="pull-right"
        ng-click="form.$show()"
        ng-if="!form.$visible">
      <i class="fa fa-pencil-square-o"></i>
    </a>
  </h4>
</div>\
`
  })
])
