/* eslint-disable no-useless-constructor, no-unused-vars */
import AgBaseControl from '../AgBaseControl'
import _ from 'lodash'

/**
 * the heavy lifting is done in the modified ui-select2 directive
 */
class Controller extends AgBaseControl {
  $onInit() {
    super.onInit()
    if (this.isRequired === true) {
      // if not spcifically setting allowClear then set to false by default if its a required field
      if (!_.has(this.selectOptions, 'allowClear')) {
        this.selectOptions.allowClear = false
      }
    }
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-select.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^?agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    selectOptions: '<',
    apiKey: '@'
  }
})
