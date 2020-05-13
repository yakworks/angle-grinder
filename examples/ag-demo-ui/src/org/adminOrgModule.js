import angular from 'angular'
import angleGrinder from '~/angle-grinder'
import contactModule from '../contact'
import noteModule from '../note'
import layout from '../layout/app.module'
import orgState from './states'
import layoutStateWrapper from "../layout/layoutStateWrapper";

const MOD_NAME = 'admin.org'
const org = angular.module(MOD_NAME, [angleGrinder, contactModule, noteModule, layout])
org.config(function(resourceBuilderProvider) {
  resourceBuilderProvider.setRestContext('/api')
})

org.config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {
  stateHelperProvider.state(layoutStateWrapper(orgState))
  $urlRouterProvider.otherwise('/')
})

export default MOD_NAME
