import angular from 'angular'
import dropdownModule from './dropdown/dropdown.module'
import buttonModule from './button/button.module'

const MOD_NAME = 'ag.components'
export default MOD_NAME

angular.module(MOD_NAME, [
  dropdownModule,
  buttonModule
])
