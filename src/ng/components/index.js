import angular from 'angular'
import agFormMod from './ag-form'
import agCheckboxModule from './ag-checkbox/ag-checkbox.comp'
import agLabel from './ag-label'
import agInput from './ag-input'
import agInputBs from './ag-input-bs'
import agSelectModule from './ag-select'
import agSelectRest from './ag-select-rest'
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
  agSelectModule,
  agSelectRest,
  agCheckboxModule,
  dropdownModule,
  buttonModule
])
  .directive('agLabel', agLabel)
  .directive('agInput', agInput)
  .directive('agInputBs', agInputBs)
