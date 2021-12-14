// import controller from './listCtrl'
import template from './list.html'
import ListDatastoreCtrl from 'angle-grinder/src/ng/gridz/list-datastore/ListDatastoreCtrl'
import buildOptions from './listCtrlOptions'
import localStoreApi from '../../store/LocalStoreApi'
import Log from 'angle-grinder/src/utils/Log'
import Swal from 'angle-grinder/src/tools/swal'
import _ from 'lodash'

class ListCtrl extends ListDatastoreCtrl {
  isLoaded = false

  editTemplate = require('./templates/editDialog.html')
  bulkUpdateTemplate = require('./templates/bulkUpdateForm.html')

  constructor(...args) {
    super(...args)
    this.dataApi = localStoreApi.invoice
  }

  async $onInit() {
    // this.dataApi = localStoreApi.invoice
    this.cfg = buildOptions(this)
    await this.doConfig(this.cfg)
  }

  displaySelectedRowsData() {
    console.log('displaySelectedRowsData')
    this.selectedRowsData = this.gridCtrl.getSelectedRows()
  }

  import() {
    console.log('import')
    Swal.fire('import something')
  }

}

export default angular
  .module('ag.demo.basicGridDemo', [])
  .component('basicGridDemo', {
    template: template,
    controller: ListCtrl
  })
  .component('basicSearchForm', {
    template: require('./templates/searchForm.html')
  })
  .name
