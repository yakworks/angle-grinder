import dataApiFactory from '~/store/dataApiFactory'
import makeNgListDataCtrl from '@ag/ng/gridz/list-ds/makeNgListDataCtrl'

function ListCtrlFn($scope, $element, $uibModal, selectedRow) {
  'ngInject';

  const ctrl = makeNgListDataCtrl({ $scope, $element, $uibModal })

  ctrl.searchModel = {}

  ctrl.$onInit = async () => {
    ctrl.dataApi = dataApiFactory.invoice
    await ctrl.doConfig()
    ctrl.searchModel.customerId = selectedRow.getSelectedId()
  }

  ctrl.$doCheck = async () => {
    const selectedRowId = selectedRow.getSelectedId()
    if (selectedRowId && ctrl.searchModel.customerId !== Number(selectedRowId)) {
      ctrl.searchModel.customerId = Number(selectedRowId)
      ctrl.search(ctrl.searchModel)
    }
  }

  return ctrl
}
ListCtrlFn.$inject = ['$scope', '$element', '$uibModal', 'selectedRow'];

export default ListCtrlFn
