import makeListDataCtrl from '../../src/gridz/makeListDataCtrl'
import mix from '../../src/utils/mix-it-with';

/**
 * Svelte impl WIP
 *
 */
const makeSvelteListDataCtrl = async ({ dataApi }) => {
  // make the default
  let ctrl = makeListDataCtrl({ dataApi })
  await ctrl.doConfig()
  // let { doConfig: superDoConfig } = ctrl

  //overrides
  let ext = {

    //TODO implement these
    getEditModalCtrl() { return null },
    getBulkUpdateModalCtrl() { return null },

    showEdit(title, model) {

    },

    // modal options for edit
    getEditOptions(template, model, title) {
      return { }
    },

    showBulkUpdate() {

    },

    getBulkUpdateOptions(model = {}) {
      return {}
    },

  }

  return Object.assign(ctrl, ext)
}

export default makeSvelteListDataCtrl
