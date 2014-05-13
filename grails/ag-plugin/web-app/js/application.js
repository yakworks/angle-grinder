// The main scaffolding module
var app = angular.module("angleGrinder", [
    "ngResource",
    "ngRoute",
    "ui.select2",

    "angleGrinder.common",
    "angleGrinder.gridz",
    "angleGrinder.forms",
    "angleGrinder.alerts",
    "angleGrinder.spinner",
    "angleGrinder.resources"
]);

app.config([
  "$httpProvider", "pathWithContextProvider", function($httpProvider, pathWithContextProvider) {

    // Intercept all http errors
    $httpProvider.responseInterceptors.push("httpErrorsInterceptor");

    // Configure the context path
    var contextPath = $("body").data("context-path");
    if (contextPath != null) {
      pathWithContextProvider.setContextPath(contextPath);
    }
  }
]);

// Intercepts all HTTP errors and displays a flash message
app.factory("httpErrorsInterceptor", [
  "$injector", "$q", "alerts", function($injector, $q, alerts) {
    return function(promise) {
      var $http = $injector.get("$http");
      var onError = function(response) {
        var errorMessage, _ref;
        errorMessage = ((_ref = response.data) != null ? _ref.error : void 0) || "Unexpected HTTP error";

        // ..skip validation errors
        if (response.status !== 422) {
          alerts.error(errorMessage);
        }

        return $q.reject(response);
      };
      return promise.then(null, onError);
    };
  }
]);

// Catch all jquery xhr errors
app.run([
  "$log", "alerts", function($log, alerts) {
    return $(document).ajaxError(function(event, jqxhr, settings, exception) {
      $log.error("Network error:", event, jqxhr, settings, exception);
      return alerts.error(exception);
    });
  }
]);
