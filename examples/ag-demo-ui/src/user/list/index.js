import angular from 'angular'

import module from '../userModule'
import controler from './listCtrl'

angular.module(module).component('userList', {
  template: require('./list.html'),
  controller: controler
})
