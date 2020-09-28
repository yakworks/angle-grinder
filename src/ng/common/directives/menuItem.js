import BaseCtrl from '../../utils/BaseCtrl'
import angular from 'angular'
import commonModule from '../commonModule'
import _ from 'lodash'

const app = angular.module(commonModule)

app.directive('menuItem', [
  '$route', $route => ({
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: true,

    link(scope, element, attrs) {
      let listIcon
      scope.href = '#/' + attrs.for
      const parent = element.parent()
      if (!_.isNil(parent[0].attributes['list-icon'])) { listIcon = parent[0].attributes['list-icon'].value }
      scope.icon = attrs.icon || listIcon || 'fas fa-circle'
      return scope.isActive = () => $route.current?.page === attrs.for
    },

    template: `\
<li ng-class="{ active: isActive() }">
<a href="{{href}}">
  <i class="{{icon}}"></i>
    <span ng-transclude></span>
  </a>
</li>\
`
  })
])

class MenuCtrl extends BaseCtrl {
  static initClass() {
    this.register(app, 'agMenuCtrl')
    this.inject('$scope')
  }

  initialize() {
    this.status = {}
    return this.$scope.$on('$routeChangeSuccess', (event, currentRoute) => {
      return this.status[currentRoute.section] = true
    })
  }
}
MenuCtrl.initClass()
