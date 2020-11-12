/* eslint-disable no-useless-constructor, no-unused-vars */
import AgBaseControl from '../AgBaseControl'
import _ from 'lodash'

/**
 * the heavy lifting is done in the modified ui-select2 directive
 */
class Controller extends AgBaseControl {

  opts = {
    displayFields:['name'],
    formatResult2: (item) => this.repoFormatResult(item)
  }

  $onInit() {
    super.onInit()
    if (this.isRequired === true) {
      // if not spcifically setting allowClear then set to false by default if its a required field
      if (!_.has(this.selectOptions, 'allowClear')) {
        this.selectOptions.allowClear = false
      }
    }

    _.merge(this.opts, this.selectOptions)
    this.options = this.opts
    this.selectOptions.formatResult2 = (item) => this.repoFormatResult(item)
  }

  repoFormatResult(item) {
    console.log('333333333333333333333333')
    let displayTds = ''
    this.opts.displayFields.forEach( it => displayTds = `${displayTds} <td>${item[it]}</td>` )
    var markup = `
      <table class="table table-condensed select-rest-result">
        <tr>
          ${displayTds}
        </tr>
      </table>
    `
    return markup;
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
