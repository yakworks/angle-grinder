import angular from 'angular'
import formsModule from '../formsModule'
import _ from 'lodash'

var forms = angular.module(formsModule)

forms.directive('agSubmitButton', () => ({
  restrict: 'E',
  replace: true,
  scope: true,
  require: '^form',

  link(scope, element, attrs, formCtrl) {
    // Check if submit button is in the modal window
    // used to disable submit button while modal closing
    let isModalWindow
    if (!_.isNil(element[0].offsetParent)) { isModalWindow = element[0].offsetParent.hasAttribute('modal-window') }
    const isSaving = () => formCtrl.$saving
    scope.$watch(isSaving, function(saving) {
      if (!(isModalWindow && scope.saving)) { return scope.saving = saving }
    })

    return scope.text = attrs.text || 'Save'
  },

  template: `\
<button type="submit" class="btn btn-default btn-primary"
        ng-disabled="saving">
  <i class="fa fa-check fa-inverse"></i> {{text}}<span ng-show="saving">...</span>
</button>\
`
}))
