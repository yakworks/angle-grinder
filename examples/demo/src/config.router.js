import angular from 'angular'
import {packet, fresh} from './routerStates.js'
import appState from 'angle-grinder/src/tools/AppState'
/**
 * Config for the router
 */
angular.module('app')
.config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {
  // $urlRouterProvider.otherwise("/app/ui/elements");
  // $urlRouterProvider.otherwise('/app/dashboard')

  $urlRouterProvider.otherwise('/fresh/dashboard')
  stateHelperProvider.state(fresh)
  appState.routerStates = fresh
  //$urlRouterProvider.otherwise('/app/dashboard')
  // stateHelperProvider.state(packet)
  // appState.routerStates = packet

  //console.log("appState.routerStates", appState.routerStates)
  // $stateProvider.state({
  //   name: 'fresh',
  //   url: '/fresh',
  //   component: 'freshApp'
  //   //template: require('./app2.html')
  // })

})
