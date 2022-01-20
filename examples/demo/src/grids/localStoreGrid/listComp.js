// import controller from './listCtrl'
import template from './list.html'
import buildOptions from './listCtrlOptions'
import sessionStores from '~/store/sessionServices'
import Swal from '@yakit/ui/swal'
import _ from 'lodash'
import makeNgListDataCtrl from '@ag/ng/gridz/list-ds/makeNgListDataCtrl'

const searchTemplate = require('./templates/searchForm.html')
const editTemplate = require('./templates/editDialog.html')
const bulkUpdateTemplate = require('./templates/bulkUpdateForm.html')

function ListCtrlFn($scope, $element, $uibModal) {
  'ngInject';

  const ctrl = makeNgListDataCtrl({
    $scope, $element, $uibModal,
    bulkUpdateTemplate, editTemplate
  })

  ctrl.$onInit = async () => {
    ctrl.dataApi = sessionStores.invoice
    ctrl.ctx = buildOptions(ctrl)
    await ctrl.doConfig(ctrl.ctx)

    ctrl.state = ctrl.ctx.state
  }

  ctrl.displaySelectedRowsData = () => {
    ctrl.selectedRowsData = ctrl.getGridCtrl().getSelectedRows()
  }

  ctrl.import = () => {
    Swal.fire('import something')
  }

  return ctrl
}
ListCtrlFn.$inject = ['$scope', '$element', '$uibModal'];

export default angular
  .module('ag.demo.basicGridDemo', [])
  .component('basicGridDemo', {
    bindings: {
      dataApi: '<',
    },
    template: template,
    controller: ListCtrlFn
  })
  .component('basicSearchForm', {
    template: searchTemplate
  })
  .name
