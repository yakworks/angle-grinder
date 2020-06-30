import angular from 'angular'
import agGridToolbar from './ag-grid-toolbar'
import agOptionsDropdown from './ag-options-dropdown'
import tbButton from './tb-button'

const MOD_NAME = 'ag.gridz.toolbar'
export default MOD_NAME

angular.module('ag.gridz.toolbar', [])
  .directive('agOptionsDropdown', agOptionsDropdown)
  .directive('agGridToolbar', agGridToolbar)
  .directive('tbButton', tbButton)
