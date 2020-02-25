import angular from 'angular'
import appRoot from '../../routerStates.js'

/**
 * Clip-Two Main Controller
 */
const app = angular.module('app')
app.controller('SideNavCtrl',
  function($scope) {
    $scope.sideMenuItems = appRoot.children
  }
)
