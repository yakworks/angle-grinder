import _ from 'lodash'

class FormCtrl {
  vm = {}
  constructor() {
  }
}

angular.module('app')
  .component('xtformExample', {
    controller: FormCtrl,
    template: require('./xtform.comp.html')
  })
