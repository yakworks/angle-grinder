// import angular from 'angular'
import { packet, fresh, login } from './routerStates'
import appState from '@yakit/ui/AppState'
import stateHelperInit from 'angle-grinder/src/ng/uirouter/stateHelperInit'
import _ from 'lodash'

/**
 * Config for the router
 */
angular.module('app')
  .config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {
    'ngInject';
  // $urlRouterProvider.otherwise("/app/ui/elements");
  // $urlRouterProvider.otherwise('/app/dashboard')
    const freshRouterStates = _.cloneDeep(fresh)
    const freshMenu = _.cloneDeep(fresh)
    // const packetCopy = _.cloneDeep(packet)

    $urlRouterProvider.otherwise('/fresh/dashboard')
    stateHelperProvider.state(freshRouterStates)

    stateHelperInit(freshMenu)
    console.log("freshMenu", freshMenu)
    appState.sideMenuConfig = freshMenu

    // $stateProvider.state({
    //   name: 'login',
    //   url: '/login',
    //   template: '<h1>This is Login</h1>'
    // })
    $stateProvider.state(login)
    // $urlRouterProvider.otherwise('/packet/dashboard')
    // stateHelperProvider.state(packetCopy)
    // appState.packetStates = packetCopy

    // $stateProvider.state({
    //   name: 'fresh',
    //   url: '/fresh',
    //   component: 'freshApp'
    //   //template: require('./app2.html')
    // })
  })
