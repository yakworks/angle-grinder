// import controller from './listCtrl'
import template from './list.html'
import ListDataApiCtrl from 'angle-grinder/src/ng/gridz/list-datastore/ListDataApiCtrl'
import buildOptions from './listCtrlOptions'
import sessionStores from '../../store/sessionServices'
import Log from 'angle-grinder/src/utils/Log'
import Swal from 'angle-grinder/src/tools/swal'
import _ from 'lodash'

class ListCtrl extends ListDataApiCtrl {
  isLoaded = false

  editTemplate = require('./templates/editDialog.html')
  bulkUpdateTemplate = require('./templates/bulkUpdateForm.html')

  constructor(...args) {
    super(...args)
    this.dataApi = sessionStores.invoice
  }

  async $onInit() {
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
