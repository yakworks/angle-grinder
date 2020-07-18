import gridMod from '../module'
import BaseListCtrl from 'angle-grinder/src/ng/gridz/list/BaseListCtrl'
// import restStoreApi from '../../store/RestStoreApi'
import _ from 'lodash'

const template = `
<div class="pt-2">
  <gridz ng-if="$ctrl.isConfigured" grid-options="$ctrl.cfg.gridOptions"
        toolbar-options="$ctrl.cfg.toolbarOptions"
        grid-id="basicGrid"
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
    super.doConfig()
  }
}

export default angular
  .module(gridMod)
  .component('agGridList', {
    bindings: { apiKey: '<' },
    template: template,
    controller: ListCtrl
  })
  .name
