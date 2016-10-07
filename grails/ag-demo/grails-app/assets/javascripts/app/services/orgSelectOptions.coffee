app = angular.module "angleGrinder"
app.service "orgSelectOptions", [ "Select2Options", "pathWithRestContext", (select2Options, pathWithContext) ->

  ->
    select2Options
      width: 190
      ajax:
        url: pathWithContext("/api/orgs?max=1000")

    # formatters for result and selection
      formatResult: (org) ->  org.name
      formatSelection: (org) -> org.name
]
