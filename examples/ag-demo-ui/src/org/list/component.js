import angular from 'angular'

import orgModule from '../adminOrgModule'
import controler from './listCtrl'

angular.module(orgModule).component('orgList', {
  template: require('./list.html'),
  controller: controler
})
