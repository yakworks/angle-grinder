import makeListDataCtrl from '../../src/gridz/makeListDataCtrl'
import mix from '../../src/utils/mix-it-with';

/**
 * Svelte impl. Creates a controller for a data service api.
 * Pulls config from appConfig for toolbar and columns if its a grid.
 * This can be used for any list based view, not just a grid.
 */
const DataApiListController = async ({ dataApi, ctx = {} }) => {
  // make the default
  let ctrl = makeListDataCtrl({ dataApi })
  // look into appConfig for config for columns and toolbar and setup ctx
  await ctrl.doConfig(ctx)

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

export default DataApiListController
