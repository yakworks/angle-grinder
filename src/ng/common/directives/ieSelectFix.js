import angular from 'angular'
import commonModule from '../commonModule'

angular.module(commonModule).directive('ieSelectFix', ['$window', $window => ({
  restrict: 'A',

  link(scope, elem, attrs) {
    return elem.bind('change', function(event) {
      if ($window.navigator.userAgent.indexOf('MSIE 9') > 0) {
        return Array.from(elem).map((option) => option.parentNode.insertBefore(option, option))
      }
    })
  }
})
])
