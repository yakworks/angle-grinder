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
<div class="buttons is-right mt-2">
  <span ng-if="form.$visible">
    <ag-button type="submit" icon-left="fa-check" color="primary" is-disabled="form.$invalid || form.$waiting">Save</ag-button>
    <ag-button color="light" icon-left="fa-times" is-disabled="form.$waiting" ng-click="cancel()">Cancel</ag-button>
  </span>
</div>\
`
  })
])
