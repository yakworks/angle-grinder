'use strict'
/**
  * Prevent default action on empty links.
*/
import commonModule from '../commonModule'

angular.module(commonModule)
.directive('a', function() {
  return {
    restrict: 'E',
    link: function(scope, elem, attrs) {
      if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
        elem.on('click', function(e) {
          e.preventDefault()
        })
      }
    }
  }
})
