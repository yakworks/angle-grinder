app = angular.module("angleGrinder.forms")

app.service "select2Options", ->
  (options = {}, dataOptions = {}) ->
    options.ajax or= {}

    # build default options
    defaults =
      width: "element"
      initSelection: true

      ajax:
        dataType: "json"
        url: angular.noop # dummy url, must be overridden

        data: (term, page) ->
          dataDefaults =
            # search term (query params)
            q: term

            # sorting and pagination
            sort: "id"
            order: "asc"
            max: 20, page: page

          _.defaults(dataOptions, dataDefaults)

        results: (result, page) ->
          results: result.rows
          more:    page < result.total

      # formatters for result and selection
      formatResult: (record) -> record.name
      formatSelection: (record) -> record.name

    ajax = _.defaults(options.ajax, defaults.ajax)
    options = _.defaults(options, defaults)
    options.ajax = ajax
    options
