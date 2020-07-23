import angular from 'angular'
import filtersModule from './filtersModule'

// Filter for boolean values, presents '✓' or '✘'
angular.module(filtersModule).filter('checkMark', () => function(input, options) {
  if (options == null) { options = {} }
  if (input) {
    if (options.hideTruth) { return '' }
    return '\u2713'
  } else {
    if (options.hideFalse) { return '' }
    return '\u2718'
  }
})
