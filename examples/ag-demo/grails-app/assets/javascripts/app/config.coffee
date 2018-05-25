forms = angular.module("angleGrinder.forms")

#Just an example for configuring dates formats
forms.config [
  "agDateProvider", (provider) ->
    provider.setViewFormat("MM/DD/YY")
    provider.setLocalDateFormat("YYYY-MM-DD")
]
