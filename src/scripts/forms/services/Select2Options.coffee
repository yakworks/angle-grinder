app = angular.module("angleGrinder.forms")

app.service "Select2Options", ->
  (options = {}, dataOptions = {}) ->
    options.ajax or= {}

    # build default options
    defaults =
      width: "element"
      initSelection: angular.noop

      ajax:
        dataType: "json"
        url: angular.noop # dummy url, must be overridden

        data: (term, page = 1) ->
          dataDefaults =
            # search term (query params)
            q: term

            # sorting and pagination
            sort: "id"
            order: "asc"
            max: 20, page: page

          angular.extend(dataDefaults, dataOptions)

        results: (result, page) ->
          results: result.rows
          more:    page < result.total

      # formatters for result and selection
      formatResult: (record) -> record.name
      formatSelection: (record) -> record.name

    ajax = angular.extend(defaults.ajax, options.ajax)
    options = angular.extend(defaults, options)
    options.ajax = ajax
    options
