app = angular.module "angleGrinder.common"

app.provider "agCurrencyFilter", ->
  defaultSymbol = "$"
  defaultFormat = "<%= symbol %><%= amount %>"

  # Set the default currency symbol
  # which will be used across the whole application.
  setDefaultSymbol: (symbol) ->
    defaultSymbol = symbol

  # Set the default currency format
  setDefaultFormat: (format) ->
    defaultFormat = format

  $get: [
    "$filter", "isFalsy",
    ($filter, isFalsy) ->

      (amount, symbol = defaultSymbol) ->
        return "" if isFalsy(amount)

        formattedAmount = $filter("currency")(amount, "")
        _.template(defaultFormat)(amount: formattedAmount, symbol: symbol)

  ]
