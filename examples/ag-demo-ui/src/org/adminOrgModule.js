import angular from 'angular'
import angleGrinder from '~/angle-grinder'
import contactModule from '../contact'
import noteModule from '../note'

const MOD_NAME = 'admin.org'
const org = angular.module(MOD_NAME, [angleGrinder, contactModule, noteModule])
org.config(function(resourceBuilderProvider) {
  resourceBuilderProvider.setRestContext('/api')
})
org.config(function($stateProvider, $urlRouterProvider) {
  console.log('orgAdmin App config')
  const list = {
    name: 'orgList',
    controller: 'org.ListCtrl',
    url: '/',
    template: require('../../public/templates/org/list.html')
  }

  const create = {
    name: 'orgCreate',
    url: '/create',
    controller: 'org.FormCtrl',
    template: require('../../public/templates/org/form.html'),
    resolve: { org: ['Resource', Resource => new Resource()] }
  }

  const show = {
    name: 'orgShow',
    url: '/{id}',
    template: require('../../public/templates/tabbedOrg/show.html'),
    resolve: {
      org:  ($transition$, resourceResolver) => resourceResolver($transition$.params().id)
    }
  }

  const edit = {
    name: 'orgEdit',
    url: '/{id}/edit',
    template: require('../../public/templates/org/form.html'),
    controller: 'org.FormCtrl',
    resolve: {
      org:  ($transition$, resourceResolver) => resourceResolver($transition$.params().id)
    }
  }
  $stateProvider.state(list)
  $stateProvider.state(create)
  $stateProvider.state(show)
  $urlRouterProvider.otherwise('/')
})

export default MOD_NAME
