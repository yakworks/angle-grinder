import angular from 'angular'
import agButton from './button'
import agDropdown from './dropdown'
import rippleModule from './button/ripple'

const MOD_NAME = 'ag.components'
export default MOD_NAME

angular.module(MOD_NAME, [
  rippleModule
])
  .directive('agButton', agButton)
  .directive('agDropdown', agDropdown)
