import angular from 'angular'
import commonModule from '../commonModule'

angular.module(commonModule).directive('agFileUpload', () => ({
  restrict: 'A',
  require: 'ngModel',

  link(scope, elem, attrs, ctrl) {
    return elem.bind('change', event => scope.$apply(function(self) {
      ctrl.$setViewValue(elem.val())
      ctrl.$render()
      return self[attrs.agFileUpload](event)
    }))
  }
}))
