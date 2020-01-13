import angular from 'angular'
import gridzModule from '../gridzModule'

const gridz = angular.module(gridzModule)

gridz.directive('agNewButton', ['$compile', $compile => ({
  restrict: 'A',

  link(scope, element, attrs) {
    const text = angular.element($compile('<i class="fa fa-plus" uib-tooltip="Create new"></i> ')(scope))
    return element.append(text)
  }
})
])
