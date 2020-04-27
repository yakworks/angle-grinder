import angular from 'angular'
import angleGrinder from '~/angle-grinder'
import contactModule from '../contact'
import noteModule from '../note'
import layout from '../layout/app.module'
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
  url:'/',
  component: 'orgList'
}

const orgState = {
  name: 'org',
  abstract: true,
  url: '^',
  data: {
    icon: 'mdi mdi-monitor-dashboard'
  },
  children: [orgListStates, orgEditState, orgCreate]
}


export default MOD_NAME
