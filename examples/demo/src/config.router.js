import angular from 'angular'
import { packet, fresh } from './routerStates.js'
import appState from 'angle-grinder/src/tools/AppState'
import _ from 'lodash'

/**
 * Config for the router
 */
angular.module('app')
  .config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {
  // $urlRouterProvider.otherwise("/app/ui/elements");
  // $urlRouterProvider.otherwise('/app/dashboard')
    const freshCopy = _.cloneDeep(fresh)
    const packetCopy = _.cloneDeep(packet)

    $urlRouterProvider.otherwise('/fresh/dashboard')
    stateHelperProvider.state(freshCopy)
    appState.routerStates = freshCopy

    // $urlRouterProvider.otherwise('/packet/dashboard')
    stateHelperProvider.state(packetCopy)
    appState.packetStates = packetCopy

    // console.log("appState.routerStates", appState.routerStates)
    // $stateProvider.state({
    //   name: 'fresh',
    //   url: '/fresh',
    //   component: 'freshApp'
    //   //template: require('./app2.html')
    // })
  })
