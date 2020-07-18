import exampleGridOptions from "./exampleGridOptions"
import MassUpdateFormCtrl from "../commonComponents/massUpdate/MassUpdateFormCtrl";
import template from './list.html'

/* @ngInject */
class ListCtrl {
  showSearchForm = true

  constructor($scope, resourceBuilder, DialogCrudCtrlMixin, MassUpdateMixin) {
    this.$scope = $scope
    this.resourceBuilder = resourceBuilder
    this.DialogCrudCtrlMixin = DialogCrudCtrlMixin
    this.MassUpdateMixin = MassUpdateMixin
  }

  $onInit() {
    const Invoices = this.resourceBuilder('/invoices', 'invoice')
    let {$scope} = this
    this.DialogCrudCtrlMixin($scope, {
      Resource: Invoices,
      gridName: 'exampleGrid',
      template: require('../commonComponents/form/formDialog.html')
    })

    this.MassUpdateMixin($scope, {
      template: require('../commonComponents/massUpdate/massUpdateForm.html'),
      controller: MassUpdateFormCtrl,
      gridName: 'exampleGrid'
    })
  }

  gridOptions = exampleGridOptions({
    path: '/invoices'
  })

  createRecord = () => {
    this.$scope.createRecord()
  }
  massUpdate = () => {
    this.$scope.massUpdate()
  }

  getSelectedRowsData = () => {
    this.selectedRowsData = this.$scope.exampleGrid.getSelectedRows()
  }
}

/* @ngInject */
class SearchController {
  constructor($scope){
    this.$scope = $scope
  }
  filters = {}
}

export default angular
  .module('ag.demo.legacyGridDemo', [])
  .component('legacyGridDemo', { template, controller: ListCtrl })
  .component('legacySearchForm', {
    template: require('./form/searchForm.html'),
    controller: SearchController,
    controllerAs: 'searchCtrl',
    bindings: {
      filters: '<'
    },
  })
  .name
