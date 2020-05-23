import angular from 'angular'
import adminOrg from '../org/module'
import layout from '../layout/app.module'

const MOD_NAME = 'admin.orgTabs'
angular.module(MOD_NAME, [adminOrg, layout])
  .config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {
    //stateHelperProvider.state(orgState)
    $urlRouterProvider.otherwise('/')
  })

export default MOD_NAME
