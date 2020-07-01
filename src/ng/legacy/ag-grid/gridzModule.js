import angular from 'angular'
import agCommon from '../../common'
import resourceSupport from '../../resourceSupport'
import agSelect2 from '../select2'
import ngSanitize from 'angular-sanitize'
import 'angular-drag-and-drop-lists'
import 'free-jqgrid/js/jquery.jqgrid.src.js'

const MOD_NAME = 'angleGrinder.gridz'
export default MOD_NAME

var gridz = angular.module(MOD_NAME, [
  agCommon,
  resourceSupport,
  agSelect2,
  ngSanitize,
  'dndLists'
])

// Globally expose custom formatters for currencies.
// Used by jgGrid for formatting cell values.
gridz.run(function($window, agCurrencyFilter) {
  $window.agCurrencyFilter = agCurrencyFilter
})
