import angular from 'angular'
import commonModule from '../commonModule'
import _ from 'lodash'

angular.module(commonModule).directive('agSideMenu', [
  '$window', '$timeout', ($window, $timeout) => ({
    restrict: 'A',

    link(scope, element, attr) {
      let headerHeight = 0
      // let elScrollTopOriginal = 0
      $timeout(function() {
        const header = angular.element(document.getElementById(attr.header))
        // elScrollTopOriginal = element.offset().top
        if (!_.isNil(angular.element(header)[0])) { return headerHeight = angular.element(header)[0].offsetHeight }
      })

      const window = angular.element($window)
      return window.bind('scroll', function() {
        if (window[0].pageYOffset > headerHeight) {
          element.css('position', 'fixed').css('top', `${attr.offset}px`)
        }
        if (window[0].pageYOffset <= headerHeight) {
          return element.css('position', 'relative')
        }
      })
    }
  })
])
