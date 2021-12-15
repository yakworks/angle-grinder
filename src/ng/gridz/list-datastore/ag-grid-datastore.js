// @ts-nocheck
import ListDataApiCtrl from './ListDataApiCtrl'
import union from 'lodash/union'

const template = `
<div class="pt-2">
  <div ng-if="$ctrl.notification" class="notification" ng-class="$ctrl.notification.class">
    <button class="delete" ng-click="$ctrl.notification = false"></button>
    {{$ctrl.notification.text}}
  </div>
  <ag-grid-list-search ng-if="$ctrl.isConfigured" list-ctrl="$ctrl" ng-show="$ctrl.gridCtrl.showSearchForm">
  </ag-grid-list-search>
  <gridz-datastore ng-if="$ctrl.isConfigured" grid-options="$ctrl.cfg.gridOptions"
        toolbar-options="$ctrl.cfg.gridOptions.toolbarOptions"
        grid-id="{{$ctrl.gridId()}}">
  </gridz-datastore>
</div>
`
class ListCtrl extends ListDataApiCtrl {

  $onInit() {
    this.isConfigured = false
    this.cfg = {}
    super.doConfig()

    if (this.restrictSearch) {
      this.dataApi.restrictSearch = this.restrictSearch
    }
    if (this.initSearch) {
      //FIXME why do we set the initSearch to cfg?
      this.cfg.initSearch = this.initSearch
      this.searchModel = { ...this.initSearch, ...this.searchModel }
    }
  }

  // we need to generate gridId, because if we have 2 grids on a page they will have the same id and 2 pagers will
  // be assisgned to the second grid
  gridId() {
    return this.apiKey?.replace(/[^\w\s]/gi, '_') + 'Grid'
  }
}

export default {
  bindings: {
    apiKey: '<', // used for gridId and to get the config
    dataApi: '<',
    notification: '<',
    initSearch: '<',
    restrictSearch: '<'
  },
  template: template,
  controller: ListCtrl
}
