import angular from 'angular'
import agFormMod from './ag-form'
import agCheckbox from './ag-checkbox'
import agLabel from './ag-label'
import agInput from './ag-input'
import agInputBs from './ag-input-bs'
import agSelect from './ag-select'
import agSelectRest from './ag-select-rest'
import agDatepicker from './ag-datepicker'
import agDatepickerInput from './ag-datepicker/input'
import agDaterange from './ag-daterange'
import agValMod from './ag-validation'

// import InputPasswordComponent from './ag-password/input-password.component'
// import StringUtility from './string-utility';

const MOD_NAME = 'ag.form.controls'
export default MOD_NAME

angular.module(MOD_NAME, [
  agFormMod,
  agValMod
])
  .directive('agCheckbox', agCheckbox)
  .directive('agLabel', agLabel)
  .directive('agInput', agInput)
  .directive('agSelect', agSelect)
  .directive('agDatepicker', agDatepicker)
  .directive('agDatepickerInput', agDatepickerInput)
  .directive('agDaterange', agDaterange)
  .directive('agInputBs', agInputBs)
  .directive('agSelectRest', agSelectRest)
