import dataApiFactory from '~/store/dataApiFactory'
import makeNgListDataCtrl from '@ag/ng/gridz/list-ds/makeNgListDataCtrl'
import {merge} from '@yakit/core/dash'

function ListCtrlFn($scope, $element, $uibModal, selectedRow) {
  'ngInject';

  const ctrl = makeNgListDataCtrl({ $scope, $element, $uibModal })
  ctrl.searchModel = {}

  ctrl.$onInit = async () => {
    ctrl.eventHandlers = {
      onSelect: (event, id) => {
        selectedRow.setSelectedIds(ctrl.gridCtrl.getSelectedRowIds())
      }
    }

    ctrl.dataApi = dataApiFactory.customer
    await ctrl.doConfig()
    ctrl.ctx = merge(ctrl.ctx, { gridOptions: { rowNum: 5, selectFirstRow: true, multiboxonly: true } })
  }

  return ctrl
}
ListCtrlFn.$inject = ['$scope', '$element', '$uibModal', 'selectedRow'];

export default ListCtrlFn
