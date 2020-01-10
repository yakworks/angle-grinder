/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module('angleGrinder.common')

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
      '$filter', 'IsFalsyServ',
      ($filter, IsFalsyServ) => function(amount, symbol) {
        if (symbol == null) { symbol = defaultSymbol }
        if (IsFalsyServ(amount)) { return '' }

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
