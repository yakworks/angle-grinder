import angular from 'angular'
import commonModule from '../commonModule'

var forms = angular.module(commonModule)

// Sets focus on the element with the given name
// Works in conjunction with `agFocus` directive
forms.factory('focus', function($rootScope, $timeout) {
  return function(name) {
    $timeout(() => $rootScope.$broadcast('focusOn', name))
  }
})

// Sets the focus on the element
// TODO change it to `focus-if`
// TODO see http://ruoyusun.com/2013/08/24/a-glimpse-of-angularjs-scope-via-example.html
forms.directive('agFocus', () => ({
  restrict: 'A',

  link(scope, element, attributes) {
    const currentName = attributes.agFocus

    return scope.$on('focusOn', function(event, name) {
      if (currentName === name) {
        element.addClass('ag-focused')
        return element[0].focus()
      }
    })
  }
}))
