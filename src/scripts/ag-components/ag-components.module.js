import angular from 'angular'
import agInputModule from './ag-input/ag-input.comp'
import agSelectModule from './ag-select/ag-select.comp'
import agValMod from './ag-validation'
// import InputPasswordComponent from './ag-password/input-password.component'
// import StringUtility from './string-utility';

const MOD_NAME = 'ag.form.components'
export default MOD_NAME

angular.module(MOD_NAME, [agValMod, agSelectModule, agInputModule])
