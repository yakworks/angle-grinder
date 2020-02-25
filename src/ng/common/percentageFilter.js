import angular from 'angular'
import commonModule from './commonModule'

var app = angular.module(commonModule)

// Percentage filter, based on https://github.com/vpegado/angular-percentage-filter
app.filter('percentage', () => function(input, decimals, suffix) {
  decimals = angular.isNumber(decimals) ? decimals : 2
  suffix = suffix || '%'
  if (!isFinite(input) || (input === '')) {
    return ''
  } else {
    return (Math.round(input * Math.pow(10, decimals + 2)) / Math.pow(10, decimals)) + suffix
  }
})
