import angular from 'angular'
import commonModule from '../commonModule'

// Button which acts as browser's history back button
angular.module(commonModule).directive('agBackButton', [
  '$window', $window => ({
    restrict: 'A',

    link(scope, element) {
      return element.on('click', function(event) {
        event.preventDefault()
        return $window.history.back()
      })
    }
  })
])
