/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.forms");

app.service("Select2Options", () => (function(options, dataOptions) {
  if (options == null) { options = {}; }
  if (dataOptions == null) { dataOptions = {}; }
  if (!options.ajax) { options.ajax = {}; }

  // build default options
  const defaults = {
    width: "element",
    initSelection: angular.noop,

    ajax: {
      dataType: "json",
      url: angular.noop, // dummy url, must be overridden

      data(term, page) {
        if (page == null) { page = 1; }
        const dataDefaults = {
          // search term (query params)
          q: term,

          // sorting and pagination
          sort: "id",
          order: "asc",
          max: 20, page
        };

        return angular.extend(dataDefaults, dataOptions);
      },

      results(result, page) {
        return {
          results: result.rows,
          more:    page < result.total
        };
      }
    },

    // formatters for result and selection
    formatResult(record) { return record.name; },
    formatSelection(record) { return record.name; }
  };

  const ajax = angular.extend(defaults.ajax, options.ajax);
  options = angular.extend(defaults, options);
  options.ajax = ajax;
  return options;
}));
