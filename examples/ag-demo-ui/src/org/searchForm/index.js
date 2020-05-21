import angular from 'angular'

import module from '../adminOrgModule'
import controller from './searchFormCtrl'

angular.module(module).component('orgSearchForm', {
  template: require('./searchForm.html'),
  controller: controller
})
