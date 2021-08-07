import angular from 'angular'
import _ from 'lodash'

var app = angular.module('ag.xeditable')

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
<div class="buttons is-right mt-1">
  <span ng-if="form.$visible">
    <button type="submit" class="btn btn-default btn-primary" ng-disabled="form.$invalid || form.$waiting">
      <i class="fa fa-check fa-inverse"></i> Save
    </button>
    <button type="button" class="btn" ng-disabled="form.$waiting" ng-click="cancel()"><i class="fa fa-times"></i> Cancel </button>
  </span>
</div>\
`
  })
])
