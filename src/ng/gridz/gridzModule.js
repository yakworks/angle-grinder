import angular from 'angular'
import agCommon from '../common'
import resourceSupport from '../resourceSupport'
import agSelect2 from '../select2'
import ngSanitize from 'angular-sanitize'
import 'angular-drag-and-drop-lists'
import 'free-jqgrid/js/jquery.jqgrid.src.js'

const MOD_NAME = 'angleGrinder.gridz'
export default MOD_NAME
var gridz = angular.module('angleGrinder.gridz', [
  agCommon,
  resourceSupport,
  agSelect2,
  ngSanitize,
  'dndLists'
])

// Globally expose custom formatters for dates and currencies.
// Used by jgGrid for formatting cell values.
gridz.run([
  '$window', 'agDateFilter', 'agCurrencyFilter',
  function($window, agDateFilter, agCurrencyFilter) {
    $window.agDateFilter = agDateFilter
    return $window.agCurrencyFilter = agCurrencyFilter
  }
])
