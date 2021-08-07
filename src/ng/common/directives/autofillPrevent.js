import angular from 'angular'
import commonModule from '../commonModule'

var forms = angular.module(commonModule)

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
