import angular from 'angular'

import module from '../userModule'
import controller from './formCtrl'

angular.module(module).component('userForm', {
  bindings: {
    user: '<'
  },
  template: require('./form.html'),
  controller: controller
})
