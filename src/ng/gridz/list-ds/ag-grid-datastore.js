import makeNgListDataCtrl from './makeNgListDataCtrl'

const template = `
<div class="pt-2">
  <div ng-if="$ctrl.notification" class="notification" ng-class="$ctrl.notification.class">
    <button class="delete" ng-click="$ctrl.notification = false"></button>
    {{$ctrl.notification.text}}
  </div>
  <ag-grid-list-search ng-if="$ctrl.state.isConfigured" list-ctrl="$ctrl" ng-show="$ctrl.state.showSearchForm">
  </ag-grid-list-search>
  <gridz-ds ng-if="$ctrl.state.isConfigured" ctx="$ctrl.ctx"
        grid-id="{{$ctrl.gridId()}}">
  </gridz-ds>
</div>
`
function ListCtrlFn($scope, $element, $uibModal) {

  const ctrl = makeNgListDataCtrl({
    $scope, $element, $uibModal
  })

  ctrl.$onInit = async () => {
    console.log("$onInit ctx", ctrl.ctx)
    await ctrl.doConfig()

    if (ctrl.restrictSearch) {
      ctrl.dataApi.restrictSearch = this.restrictSearch
    }
    if (ctrl.initSearch) {
      //FIXME why do we set the initSearch to ctx?
      ctrl.ctx.initSearch = ctrl.initSearch
      ctrl.searchModel = { ...ctrl.initSearch, ...ctrl.searchModel }
    }
    //state shotcut
    ctrl.state = ctrl.ctx.state
    console.log("End ListCtrlFn $onInit ctx", ctrl.ctx)
  }

  return ctrl
}
ListCtrlFn.$inject = ['$scope', '$element', '$uibModal'];

export default {
  bindings: {
    apiKey: '<', // used for gridId and to get the config
    dataApi: '<',
    notification: '<',
    initSearch: '<',
    restrictSearch: '<'
  },
  template: template,
  controller: ListCtrlFn
}
