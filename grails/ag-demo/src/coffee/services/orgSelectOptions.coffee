app = angular.module "angleGrinder"
app.service "orgSelectOptions", [ "select2Options", "pathWithContext", (select2Options, pathWithContext) ->

  ->
    select2Options
      width: 190
      ajax:
        url: pathWithContext("/org/pickList")

    # formatters for result and selection
      formatResult: (org) ->  org.name
      formatSelection: (org) -> org.name
]