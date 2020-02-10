import _ from 'lodash'

class ValidationsCtrl {
  vm = {}
  constructor() {
  }
}

angular.module('app')
  .component('validationsExample', {
    controller: ValidationsCtrl,
    template: require('./validations.comp.html')
  })
