import angular from 'angular'
import { packet, fresh } from './routerStates.js'
import appState from 'angle-grinder/src/tools/AppState'
import _ from 'lodash'

/**
 * Config for the router
 */
angular.module('app')
  .config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {
    // const app = _.cloneDeep(fresh)
    const app = _.cloneDeep(packet)
    // $stateProvider.state(orgEditState)
    //$urlRouterProvider.otherwise('/app/org/list')
    //stateHelperProvider.state(app)
    appState.routerStates = app

    // $urlRouterProvider.otherwise('/packet/dashboard')
    /*
    stateHelperProvider.state(packetCopy)
    appState.packetStates = packetCopy
*/
  })
