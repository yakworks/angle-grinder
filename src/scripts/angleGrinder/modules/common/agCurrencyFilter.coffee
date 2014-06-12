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

  $get: ["$filter", ($filter) ->

    (amount, symbol = defaultSymbol) ->

      formattedAmount = $filter("currency")(amount, "")
      _.template(defaultFormat)(amount: formattedAmount, symbol: symbol)

  ]
