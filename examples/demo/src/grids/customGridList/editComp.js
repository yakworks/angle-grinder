//import controller from './listCtrl'
import template from './edit.html'
class EditCtrl {
  vm={}
  /* @ngInject */
  constructor($stateParams) {
    console.log($stateParams)
    this.$stateParams = $stateParams

  }
  $onInit() {
    this.vm={id : this.$stateParams.id}
  }
}

export default angular
  .module('ag.demo.basicRestGridDemo', [])
  .component('basicRestEditGridDemo', {
    template: template,
    controller: EditCtrl
  })
  .name
