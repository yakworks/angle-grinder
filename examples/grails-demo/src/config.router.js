import angular from 'angular'
import { fresh } from './routerStates.js'
import appState from 'angle-grinder/src/tools/AppState'
import stateHelperInit from 'angle-grinder/src/ng/uirouter/stateHelperInit'
import _ from 'lodash'

/**
 * Config for the router
 */
angular.module('app')
  .config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {
    const freshRouterStates = _.cloneDeep(fresh)
    const freshMenu = _.cloneDeep(fresh)

    $urlRouterProvider.otherwise('/grails/dashboard')
    stateHelperProvider.state(freshRouterStates)

    stateHelperInit(freshMenu)
    appState.sideMenuConfig = freshMenu

  })
