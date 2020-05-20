import angular from 'angular'

import module from '../userModule'
import controler from './listCtrl'

angular.module(module).component('userList', {
  bindings: {
  },
  template: require('./list.html'),
  controller: controler
})
