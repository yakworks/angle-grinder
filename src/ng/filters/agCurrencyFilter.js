import angular from 'angular'
import filtersModule from './filtersModule'
import { isNothing } from '@yakit/core/truthy'
import _ from 'lodash'

var app = angular.module(filtersModule)

app.provider('agCurrencyFilter', function() {
  let defaultSymbol = '$'
  let defaultFormat = '<%= symbol %><%= amount %>'

  // Set the default currency symbol
  // which will be used across the whole application.
  return {
    setDefaultSymbol(symbol) {
      return defaultSymbol = symbol
    },

    // Set the default currency format
    setDefaultFormat(format) {
      return defaultFormat = format
    },

    $get: [
      '$filter', ($filter) => function(amount, symbol) {
        if (symbol == null) { symbol = defaultSymbol }
        if (amount === false || isNothing(amount)) { return '' }

        const formattedAmount = $filter('currency')(amount, '')
        return _.template(defaultFormat)({ amount: formattedAmount, symbol })
      }

    ]
  }
})

app.filter('agCurrencyOrZero', ['agCurrencyFilter', agCurrencyFilter => function(val) {
  if ((typeof (val) === 'undefined') || (val === null) || (val === 'null') || (val === '')) {
    val = 0
  }
  return agCurrencyFilter(val)
}

])
