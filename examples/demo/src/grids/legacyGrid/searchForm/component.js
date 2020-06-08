import template from './searchForm.html'

/* @ngInject */
class SearchController {
  constructor($scope){
    this.$scope = $scope
  }
  filters = {}
}
export default angular
  .module('app')
  .component('legacyGridSearch', {
    template,
    controller: SearchController,
    controllerAs: 'searchCtrl',
    bindings: {
      filters: '<'
    },
  })
  .name // .name returns the module name
