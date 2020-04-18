import angular from 'angular'
import { packet, fresh, orgEditState } from './routerStates.js'
import appState from 'angle-grinder/src/tools/AppState'
import _ from 'lodash'

/**
 * Config for the router
 */
angular.module('app')
  .config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {
    const freshCopy = _.cloneDeep(fresh)
    const packetCopy = _.cloneDeep(packet)
    //$stateProvider.state(orgEditState)
    $urlRouterProvider.otherwise('/fresh/org')
    stateHelperProvider.state(freshCopy)
    appState.routerStates = freshCopy

    // $urlRouterProvider.otherwise('/packet/dashboard')
    stateHelperProvider.state(packetCopy)
    appState.packetStates = packetCopy

  })
