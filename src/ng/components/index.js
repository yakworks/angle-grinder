import angular from 'angular'
import agButton from './button'
import agDropdown from './dropdown'
import agToolbar from './toolbar'
import agTagList from './tag-list'
import rippleModule from './button/ripple'
import contextMenuModule from './contextMenu'
import apexCharts from './apexCharts'

const MOD_NAME = 'ag.components'
export default MOD_NAME

angular.module(MOD_NAME, [
  rippleModule,
  contextMenuModule,
  apexCharts
])
  .directive('agButton', agButton)
  .directive('agDropdown', agDropdown)
  .directive('agToolbar', agToolbar)
  .directive('agTagList', agTagList)
