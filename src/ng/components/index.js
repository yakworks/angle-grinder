import angular from 'angular'
import agButton from './button'
import agDropdown from './dropdown'
import agToolbar from './toolbar'
import rippleModule from './button/ripple'
import contextMenuModule from './contextMenu'

const MOD_NAME = 'ag.components'
export default MOD_NAME

angular.module(MOD_NAME, [
  rippleModule,
  contextMenuModule
])
  .directive('agButton', agButton)
  .directive('agDropdown', agDropdown)
  .directive('agToolbar', agToolbar)
