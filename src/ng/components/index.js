import angular from 'angular'
import agFormMod from './ag-form'
import agCheckbox from './ag-checkbox'
import agLabel from './ag-label'
import agInput from './ag-input'
import agInputBs from './ag-input-bs'
import agSelect from './ag-select'
import agSelectRest from './ag-select-rest'
import agDatepicker from './ag-datepicker'
import agDatepickerControl from './datepicker/control'
import agValMod from './ag-validation'
import dropdownModule from './dropdown/dropdown.module'
import buttonModule from './button/button.module'

// import InputPasswordComponent from './ag-password/input-password.component'
// import StringUtility from './string-utility';

const MOD_NAME = 'ag.form.components'
export default MOD_NAME

angular.module(MOD_NAME, [
  agFormMod,
  agValMod,
  agSelectRest,
  dropdownModule,
  buttonModule
])
  .directive('agCheckbox', agCheckbox)
  .directive('agLabel', agLabel)
  .directive('agInput', agInput)
  .directive('agSelect', agSelect)
  .directive('agDatepicker', agDatepicker)
  .directive('agDatepickerControl', agDatepickerControl)
  .directive('agInputBs', agInputBs)
