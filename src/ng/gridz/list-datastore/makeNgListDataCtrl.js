import EditModalCtrl from './EditModalCtrl'
import BulkUpdateModalCtrl from './BulkUpdateModalCtrl'
import makeListDataCtrl from '../../../gridz/makeListDataCtrl'
import mix from '../../../utils/mix-it-with';
let editTemplate = require('./editDialog.html')
let bulkUpdateTemplate = require('./bulkUpdateDialog.html')

/**
 * NG implementation
 */
const makeNgListDataCtrl = (ctrl) => {
  // make the default
  ctrl = makeListDataCtrl(ctrl)
  let { doConfig: superDoConfig } = ctrl

  //overrides
  let ext = {
    editTemplate,
    bulkUpdateTemplate,

    //override to add scope
    async doConfig(ctx = {}) {
      //FIXME not sure why this is needed? for $postLink maybe?
      let configed = await superDoConfig(ctx)
      configed.toolbarOptions.scope = () => ctrl.$scope
      console.log("End makeNgListDataCtrl.doConfig ctx", ctrl.ctx)
      return configed
    },

    //hack to show gridCtrl as its not setup yet when this is running.
    getGridCtrl() {
      return ctrl.$element.find('gridz-datastore').controller('gridz-datastore')
    },

    getEditModalCtrl() { return EditModalCtrl },
    getBulkUpdateModalCtrl() { return BulkUpdateModalCtrl },

    showEdit(title, model) {
      const isUpdate = !!model.id
      const modInst = ctrl.$uibModal.open(
        ctrl.getEditOptions(ctrl.editTemplate, model, title)
      )
      modInst.result
        .then(editedVm => {
          isUpdate ? ctrl.getGridCtrl().updateRow(editedVm.id, editedVm) : ctrl.getGridCtrl().addRow(editedVm.id, editedVm)
        })
        .catch(() => {
          console.log('Modal dismissed at: ' + new Date())
        })
      // , () => {
      //   console.log('Modal dismissed at: ' + new Date())
      // })
    },

    // modal options for edit
    getEditOptions(template, model, title) {
      return {
        controller: ctrl.getEditModalCtrl(),
        controllerAs: 'dlgCtrl',
        template: template,
        keyboard: false, // do not close the dialog with ESC key
        backdrop: 'static', // do not close on click outside of the dialog,
        resolve: {
          vm: () => model,
          dataApi: () => ctrl.dataApi,
          ctx: () => ctrl.ctx,
          title: () => title
        }

      }
    },

    showBulkUpdate() {
      const modInst = ctrl.$uibModal.open(
        ctrl.getBulkUpdateOptions()
      )
      modInst.result
        .then(res => {
          res.data.forEach(row => {
            ctrl.getGridCtrl().updateRow(row.id, row, false)
          })
        })
        .catch(() => {
          console.log('Modal dismissed at: ' + new Date())
        })
    },

    getBulkUpdateOptions(model = {}) {
      return {
        controller: ctrl.getBulkUpdateModalCtrl(),
        controllerAs: 'dlgCtrl',
        template: ctrl.bulkUpdateTemplate,
        keyboard: false, // do not close the dialog with ESC key
        backdrop: 'static', // do not close on click outside of the dialog,
        resolve: {
          vm: () => model,
          dataApi: () => ctrl.dataApi,
          ctx: () => ctrl.ctx,
          selectedIds: () => ctrl.getGridCtrl().getSelectedRowIds()
        }

      }
    },

  }

  return Object.assign(ctrl, ext)
}

export default makeNgListDataCtrl
