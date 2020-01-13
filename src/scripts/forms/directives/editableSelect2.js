import angular from 'angular'
import formsModule from '../formsModule'

var forms = angular.module(formsModule)

// TODO spec it
forms.directive('editableSelect2', [
  'editableDirectiveFactory', editableDirectiveFactory => editableDirectiveFactory({
    directiveName: 'editableSelect2',

    inputTpl: '\
<input type="hidden" ng-model="$data" />\
'
  })
])
