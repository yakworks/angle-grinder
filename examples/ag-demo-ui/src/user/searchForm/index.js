import angular from 'angular'

import module from '../userModule'
import controller from './searchFormCtrl'

angular.module(module).component('userSearchForm', {
  bindings: {
  },
  template: require('./search.html'),
  controller: controller
})
