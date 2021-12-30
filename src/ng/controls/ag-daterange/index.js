import AgBaseControl from '../AgBaseControl'
// import Log from '../../../utils/Log'
import _ from 'lodash'
import controlsConfig from "../controlsConfig";

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
    _.merge(this.opts, controlsConfig.controls.ranges, this.datepickerOptions)
    this.placeholderFrom = this.opts.fromField.placeholder
    this.placeholderTo = this.opts.toField.placeholder
    this.elementIdFrom = this.elementId + '_from'
    this.elementIdTo = this.elementId + '_to'
    super.onInit()
    const fromFld = this.opts.fromField.name
    const toFld = this.opts.toField.name
    this.ngModelCtrl.$render = () => {
      let vmv = this.ngModelCtrl.$viewValue
      vmv = _.isEmpty(vmv) ? { [fromFld]: '', [toFld]: '' } : vmv
      // Log.debug('vmv', vmv)
      // this.valueFrom = vmv[fromFld] || ''
      // this.valueTo = vmv[toFld] || ''
      this.valueFrom = new Date(vmv[fromFld])
      this.valueTo = new Date(vmv[toFld])
    }
  }

  onChange() {
    const fromFld = this.opts.fromField.name
    const toFld = this.opts.toField.name

    const fromToObj = { ...(this.valueFrom && {[fromFld]: this.valueFrom}), ...(this.valueTo && { [toFld]: this.valueTo}) }
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
