import angular from 'angular'
import angleGrinder from '~/angle-grinder'

const MOD_NAME = 'user'
export default MOD_NAME
var app = angular.module(MOD_NAME, [angleGrinder])

app.config(function(resourceBuilderProvider) {
  resourceBuilderProvider.setRestContext('/api')
})

app.config(function(ResourceProvider) {
  ResourceProvider.setBasePath('/user')
})

app.config(function($stateProvider, $urlRouterProvider) {
  console.log('user App')
  const list = {
    name: 'userList',
    controller: 'user.ListCtrl',
    url: '/',
    template: require('../../public/templates/user/list.html')
  }

  $stateProvider.state(list)
  $urlRouterProvider.otherwise('/')
})

app.run(function($templateCache) {
  $templateCache.put('user/list/searchForm.html', require('../../public/templates/user/search.html'))
})
