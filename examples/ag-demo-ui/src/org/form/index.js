import angular from 'angular'

import module from '../module'
import controller from './formCtrl'

angular.module(module).component('orgForm', {
  bindings: {
    // one-way input binding, e.g.,
    // automatically bound to `org` on the controller
    org: '<'
  },
  template: require('./form.html'),
  controller: controller
})
