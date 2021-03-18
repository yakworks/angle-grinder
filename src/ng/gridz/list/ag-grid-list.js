import BaseListCtrl from '../../../../src/ng/gridz/list/BaseListCtrl'
// import restStoreApi from '../../store/RestStoreApi'
import _ from 'lodash'

const template = `
<div class="pt-2">
  <div ng-if="$ctrl.notification" class="notification" ng-class="$ctrl.notification.class">
    <button class="delete" ng-click="$ctrl.notification = false"></button>
    {{$ctrl.notification.text}}
  </div>
  <ag-grid-list-search ng-if="$ctrl.isConfigured" list-ctrl="$ctrl" ng-show="$ctrl.showSearchForm">
  </ag-grid-list-search>
  <gridz ng-if="$ctrl.isConfigured" grid-options="$ctrl.cfg.gridOptions"
        toolbar-options="$ctrl.cfg.gridOptions.toolbarOptions"
        grid-id="{{$ctrl.gridId()}}"
        list-ctrl="$ctrl">
  </gridz>
</div>
`
class ListCtrl extends BaseListCtrl {
  static $inject = _.union(super.$inject, ['dataStoreApi'])
  // constructor(...args) {
  //   super(...args)
  // }

  $onInit() {
    this.isConfigured = false
    this.dataApi = this.dataStoreApi[this.apiKey]
    this.cfg = {}
    if (this.initSearch) {
      this.searchModel = { ...this.initSearch, ...this.searchModel }
    }
    super.doConfig()
  }

  // we need to generate gridId, because if we have 2 grids on a page they will have the same id and 2 pagers will
  // be assisgned to the second grid
  gridId() {
    return this.apiKey + 'Grid'
  }
}

export default {
  bindings: {
    apiKey: '<',
    notification: '<',
    initSearch: '<'
  },
  template: template,
  controller: ListCtrl
}

// export default angular
//   .module(gridMod)
//   .component('agGridList', {
//     bindings: { apiKey: '<' },
//     template: template,
//     controller: ListCtrl
//   })
//   .name
