import angular from 'angular'
import agFormMod from './ag-form'
import agCheckbox from './ag-checkbox'
import agLabel from './ag-label'
import agInput from './ag-input'
import agInputBs from './ag-input-bs'
import uiSelect2Mod from './ui-select2/ui.select2'
import agSelect from './ag-select'
import agSelectRest from './ag-select-rest'
import agDatepicker from './ag-datepicker'
import agDatepickerInput from './ag-datepicker/input'
import agDaterange from './ag-daterange'
import agAmount from './ag-amount-range/ag-amount'
import agAmountRange from './ag-amount-range'
import agValMod from './ag-validation'
import agTextarea from './ag-textarea'

// import InputPasswordComponent from './ag-password/input-password.component'
// import StringUtility from './string-utility';

const MOD_NAME = 'ag.form.controls'
export default MOD_NAME

angular.module(MOD_NAME, [
  agFormMod,
  uiSelect2Mod,
  agValMod
])
  .directive('agCheckbox', agCheckbox)
  .directive('agLabel', agLabel)
  .directive('agInput', agInput)
  .directive('agSelect', agSelect)
  .directive('agDatepicker', agDatepicker)
  .directive('agDatepickerInput', agDatepickerInput)
  .directive('agDaterange', agDaterange)
  .directive('agAmount', agAmount)
  .directive('agAmountRange', agAmountRange)
  .directive('agInputBs', agInputBs)
  .directive('agSelectRest', agSelectRest)
  .directive('agTextarea', agTextarea)
