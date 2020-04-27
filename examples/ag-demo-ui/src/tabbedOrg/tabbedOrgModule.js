import angular from 'angular'
import adminOrg from '../org/adminOrgModule'
import layout from '../layout/app.module'

const MOD_NAME = 'admin.orgTabs'
angular.module(MOD_NAME, [adminOrg, layout])
  .config(function($stateProvider, $urlRouterProvider, stateHelperProvider) {
    stateHelperProvider.state(orgState)
    $urlRouterProvider.otherwise('/list')
  })

const orgEditState = {
  name: 'edit',
  url: '/{id}',
  template: require('../../public/templates/tabbedOrg/show.html'),
  controller: 'org.ShowCtrl',
  sidenavItem: false,
  resolve: {
    org: ['$transition$', 'resourceResolver', ($transition$, resourceResolver) => resourceResolver($transition$.params().id)]
  }
}

const orgCreate = {
  name: 'create',
  url: '/create',
  component: 'orgForm',
  resolve: { org: ['Resource', Resource => new Resource()] }
}

const orgListStates = {
  name: 'list',
  component: 'orgList'
}

const orgState = {
  name: 'org',
  abstract: true,
  url: '/org',
  data: {
    icon: 'mdi mdi-monitor-dashboard'
  },
  children: [orgListStates, orgEditState, orgCreate]
}
export default MOD_NAME
