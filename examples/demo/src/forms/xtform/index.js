import _ from 'lodash'

class FormCtrl {

  vm = {
  }

  constructor() {
    // vm = this
    // let model = {
    //   name: 'jim',
    //   switch: true
    // }
    // _.merge(this,model)
  }
}

angular.module('app')
  .component('xtformExample', {
    controller: FormCtrl,
    template: require('./xtform.comp.html')
  })
