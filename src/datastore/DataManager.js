/* eslint-disable no-unused-vars */
import _ from 'lodash'
import appConfigApi from './AppConfigApi'
import {defaultToolbarOpts} from './dataManagerDefaults'

/**
 * Template object for an entity. In a crud or crud like scenario there is one base entity.
 * A customer for instance. We can query for a list and display in a table.
 * We can show and or edit one of those customers.
 * The customer will have
 *
 */
export default class DataManager {
  /**
   * The endpoint key. ex: ar/customer
   */
  apiKey = ""

  /**
   * The datastore instance
   */
   datastore

  /**
   * The data, ui and grid configs
   * Has everything needed to setup the main ui for search and toolbar
   */
  config = {}

  /**
   * The q mango criteria. ex: {name: "yo*"}
   */
  q = {}

  /**
   * The fuzzy search string. Can use both this and q criteria
   */
  qSearch = ""

  //initSearch is the initialSearch criteria
  /**
   * if a default initialization for q is desired then set this
   */
  initSearch = {}

  /**
   * when grid is for child or detail data, restrictSearch is what to filter it by,
   * for example is showing invoices for customer then restrictSearch might be set to {custId:123}
   */
  restrictSearch = {}

  /**
   * sort object, with key being the field to sort and val being asc or desc
   * example: {'name': asc} or {'location.city':'desc', 'name': 'asc'}
   */
  sort = {}

  /**
   * The number of items to return
   */
  maxLength = 20

  /**
   * The requested page number
   */
  currentPage = 1
  //
  itemsTotal

  // the result of the api query
  data

  /**
   * if there were errors during request then this will be the problem
   */
  problem


  async doConfig(cfg) {
    if(!cfg){
      let apiCfg = await appConfigApi.getConfig(this.apiKey)
      cfg = _.cloneDeep(apiCfg)
    }
    this.config = cfg

    const gridOpts = cfg.gridOptions
    if (this.eventHandlers) {
      gridOpts.eventHandlers = this.eventHandlers
    }
    // assign default datatype to grid loader
    // gopts.datatype = (params) => this.gridLoader(params)
    gridOpts.dataApi = this.dataApi
    gridOpts.dataManager = this

    if (!gridOpts.toolbarOptions) gridOpts.toolbarOptions = {}
    const gridToolbarOpts = _.merge({}, defaultToolbarOpts, gridOpts.toolbarOptions)

    // setup search form show based on if searchForm is configured
    if (cfg.searchForm === undefined) {
      gridOpts.showSearchForm = false
      gridToolbarOpts.searchFormButton.class = 'hidden'
    }

    if (cfg.bulkUpdateForm === undefined) {
      gridToolbarOpts.selectedButtons.bulkUpdate.class = 'hidden'
    }

    // put the toolbarOptions at the root level
    cfg.toolbarOptions = tbopts
    _.merge(this.config, cfg)

    //flag that we can react to and only do ui when true
    this.isConfigured = true

    //setup some defaults for gridOpts
    gridOpts.contextMenuClick = (model, menuItem) => {
      return this.fireRowAction(model, menuItem)
    }
    gridOpts.restrictSearch = this.restrictSearch
    gridOpts.initSearch = this.initSearch
  }
}
