/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module('angleGrinder.forms')

app.directive('editableFormButtons', [
  '$parse', $parse => ({
    restrict: 'A',

    scope: {
      form: '=editableFormButtons',
      cancelCallBack: '&oncancel'
    },

    link(scope, element, attrs) {
      return scope.cancel = function() {
        scope.form.$cancel()
        if (!_.isNil(scope.cancelCallBack)) {
          return scope.cancelCallBack()
        }
      }
    },

    template: `\
<div class="buttons">
<!--
<button type="button" class="btn btn-default"
        ng-click="form.$show()"
        ng-if="!form.$visible">
  Edit
</button>
-->
<span ng-if="form.$visible">
  <button type="button" class="btn" ng-disabled="form.$waiting" ng-click="cancel()"><i class="fa fa-times"></i> Cancel </button>
  <button type="submit" class="btn btn-default btn-primary" ng-disabled="form.$invalid || form.$waiting"><i class="fa fa-check fa-inverse"></i> Save </button>
</span>
</div>\
`
  })
])
