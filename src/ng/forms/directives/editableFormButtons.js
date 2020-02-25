import angular from 'angular'
import formsModule from '../formsModule'
import _ from 'lodash'

var app = angular.module(formsModule)

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
<!--
<button type="button" class="btn btn-default"
        ng-click="form.$show()"
        ng-if="!form.$visible">
  Edit
</button>
-->
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
