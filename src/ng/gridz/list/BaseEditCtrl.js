// import _ from 'lodash'

import { argsMerge } from '../../utils/classUtils'
import appConfigApi from '../../../dataApi/AppConfigApi'
import _ from 'lodash'

export default class EditModalCtrl {
  static $inject = ['$scope']

  constructor(...args) {
    argsMerge(this, args)
  }

  async handleError(er) {
    const { agForm } = this.$scope
    // let errors = await er.response.json()
    agForm.setServerErrors(er.response)
    // console.error("handleError errors", errors)
  }

  async doConfig() {
    let cfg = await appConfigApi.getConfig(this.apiKey)
    this.$scope.cfg = cfg
    cfg = _.cloneDeep(cfg)
    const gopts = cfg.gridOptions
    // assign default datatype to grid loader
    gopts.datatype = (params) => this.gridLoader(params)
    if (!gopts.toolbar) gopts.toolbar = {}
    const tbopts = _.merge({}, this.defaultToolbarOpts, gopts.toolbar)

    // setup search form show based on if searchForm is configured
    if (cfg.searchForm === undefined) {
      this.showSearchForm = false
      tbopts.searchFormButton.class = 'hidden'
    }

    if (cfg.massUpdateForm === undefined) {
      tbopts.selectedButtons.massUpdate.class = 'hidden'
    }

    if (gopts.showSearchForm) this.showSearchForm = gopts.showSearchForm
    // give toolbar scope
    tbopts.scope = () => this.$scope
    cfg.toolbarOptions = tbopts
    _.defaults(this.cfg, cfg)

    this.isConfigured = true
  }
}
