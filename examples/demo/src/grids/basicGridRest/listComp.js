//import controller from './listCtrl'
import template from './list.html'
import BaseListCtrl from 'angle-grinder/src/ng/gridz/list/BaseListCtrl'
import buildOptions from "../basicGrid/listCtrlOptions"
import dataStores from '../../store/RestDataStores'
import Swal from 'angle-grinder/src/tools/swal'
import _ from 'lodash'

class ListCtrl extends BaseListCtrl {
  isLoaded = false

  editFormTpl = require('../basicGrid/templates/editDialog.html')
  massUpdateTpl = require('../basicGrid/templates/massUpdateForm.html')

  // static $inject = _.union(super.$inject, ['restDataStore', '$timeout'])

  constructor(...args) {
    super(...args)
    this.dataStore = dataStores.invoiceApi
  }

  $onInit() {
    _.defaults(this, buildOptions(this))
  }

  displaySelectedRowsData() {
    console.log("displaySelectedRowsData")
    this.selectedRowsData = this.gridCtrl.getSelectedRows()
  }

  import() {
    console.log("import")
    Swal.fire('import something')
  }

}

export default angular
  .module('ag.demo.basicRestGridDemo', [])
  .component('basicRestGridDemo', {
    template: template,
    controller: ListCtrl
  })
  .component('basicRestSearchForm', {
    template: require('../basicGrid/templates/searchForm.html')
  })
  .name
