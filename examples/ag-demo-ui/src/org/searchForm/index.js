import angular from 'angular'

import module from '../module'
import controller from './searchFormCtrl'

angular.module(module).component('orgSearchForm', {
  template: require('./searchForm.html'),
  controller: controller
})
