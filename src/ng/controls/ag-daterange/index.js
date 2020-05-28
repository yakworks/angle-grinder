import AgBaseControl from '../AgBaseControl'
// import Log from '../../../utils/Log'
import _ from 'lodash'

class Controller extends AgBaseControl {
  datepickerOptions = {}
  opts = {
    showOnFocus: true,
    fromField: {
      name: 'from',
      placeholder: 'from date'
    },
    toField: {
      name: 'to',
      placeholder: 'end date'
    }
  }

  $onInit() {
    _.merge(this.opts, this.datepickerOptions)
    this.placeholder = this.opts.fromField.placeholder
    this.placeholderTo = this.opts.toField.placeholder

    super.onInit()
    const fromFld = this.opts.fromField.name
    const toFld = this.opts.toField.name

    this.ngModelCtrl.$render = () => {
      let vmv = this.ngModelCtrl.$viewValue
      vmv = _.isEmpty(vmv) ? { [fromFld]: '', [toFld]: '' } : vmv
      // Log.debug('vmv', vmv)
      this.valueFrom = vmv[fromFld] || ''
      this.valueTo = vmv[toFld] || ''
    }
  }

  onChange() {
    const fromFld = this.opts.fromField.name
    const toFld = this.opts.toField.name

    const fromToObj = { [fromFld]: this.valueFrom, [toFld]: this.valueTo }
    // Log.debug('onChange fromToObj', fromToObj)
    this.ngModelCtrl.$setViewValue(fromToObj)
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-daterange.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    datepickerOptions: '<'
  }
})
