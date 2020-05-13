import angular from 'angular'

import orgModule from '../adminOrgModule'
import controler from './formCtrl'

angular.module(orgModule).component('orgForm', {
  bindings: {
    // one-way input binding, e.g.,
    // automatically bound to `org` on the controller
    org: '<'
  },
  template: require('./form.html'),
  controller: controler
})
