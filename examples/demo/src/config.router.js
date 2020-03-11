import angular from 'angular'
import appRoot from './routerStates.js'

/**
 * Config for the router
 */
angular.module('app')
.config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {
  // $urlRouterProvider.otherwise("/app/ui/elements");
  $urlRouterProvider.otherwise('/app/dashboard')

  stateHelperProvider.state(appRoot)

  // $stateProvider.state({
  //   name: 'fresh',
  //   url: '/fresh',
  //   component: 'freshApp'
  //   //template: require('./app2.html')
  // })

})
