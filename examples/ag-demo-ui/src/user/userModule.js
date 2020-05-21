import angular from 'angular'
import angleGrinder from '~/angle-grinder'
import layout from '../layout/app.module'
import layoutStateWrapper from '../layout/layoutStateWrapper'
import userStates from './states'

const MOD_NAME = 'user'
export default MOD_NAME
var app = angular.module(MOD_NAME, [angleGrinder, layout])

app.config(function (resourceBuilderProvider) {
  resourceBuilderProvider.setRestContext('/api')
})

app.config(function (ResourceProvider) {
  ResourceProvider.setBasePath('/user')
})

app.config(function ($stateProvider, $urlRouterProvider, stateHelperProvider) {
  //$stateProvider.state(userStates)
  stateHelperProvider.state(layoutStateWrapper(userStates))
  $urlRouterProvider.otherwise('/')
})
