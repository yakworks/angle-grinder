import angular from 'angular'
import agFormMod from './ag-form'
import agInputModule from './ag-input/ag-input.comp'
import agCheckboxModule from './ag-checkbox/ag-checkbox.comp'
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
  agInputModule,
  dropdownModule,
  buttonModule
])
