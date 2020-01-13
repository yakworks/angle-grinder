import angular from 'angular'
import formsModule from '../formsModule'

var forms = angular.module(formsModule)

forms.directive('autofillPrevent', [
  '$parse', $parse => ({
    require: 'ngModel',

    link(scope, elem, attrs, ngModel) {
    // Binds focus event to element
      elem.bind('focus', () => scope.hasBeenFocused = true)

      // Listen to any changes in view
      return ngModel.$viewChangeListeners.push(function() {
        if (!scope.hasBeenFocused) {
          return $parse(attrs.ngModel).assign(scope, ngModel.$setViewValue(''))
        }
      })
    }
  })

])
