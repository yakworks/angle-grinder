
export default class EditCtrl {
  vm={}
  /* @ngInject */
  constructor($stateParams, $state) {
    console.log($state.current.name)
    this.$stateParams = $stateParams

  }
  $onInit() {
    this.vm={id : this.$stateParams.id}
  }
}
