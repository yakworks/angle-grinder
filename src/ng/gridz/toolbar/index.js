import angular from 'angular'
import agGridToolbar from './ag-grid-toolbar'
import agOptionsDropdown from './ag-options-dropdown'

const MOD_NAME = 'ag.gridz.toolbar'
export default MOD_NAME

angular.module('ag.gridz.toolbar', [])
  .directive('agOptionsDropdown', agOptionsDropdown)
  .directive('agGridToolbar', agGridToolbar)
