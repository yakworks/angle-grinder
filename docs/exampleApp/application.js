/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// The entry point for the application

const appm = angular.module("exampleApp", [
  "ngAnimate",
  "ngRoute",

  "angleGrinder.common",
  "angleGrinder.gridz",
  "angleGrinder.forms",
  "angleGrinder.alerts",
  "angleGrinder.spinner",

  "exampleApp.resources",
  "exampleApp.grids",
  "exampleApp.docs"
]);

// Sample `pathWithContext` configuration block
appm.config([
  "pathWithContextProvider", function(pathWithContextProvider) {
    const contextPath = $("body").data("context-path");
    if (contextPath != null) { return pathWithContextProvider.setContextPath(contextPath); }
  }
]);

appm.factory("httpErrorsInterceptor", [
  "$q", "$log", "alerts",
  ($q, $log, alerts) => ({
    responseError(response) {
      const errorMessage = response.data?.error || "Unexpected HTTP error";
      $log.debug("intercepting", errorMessage, response);

      // skip validation and auth errors
      if ((response.status !== 422) && (response.status !== 401)) { alerts.error(errorMessage); }

      return $q.reject(response);
    }
  })

]);

appm.config([
  "$httpProvider", $httpProvider => // register http errors interceptor
$httpProvider.interceptors.push("httpErrorsInterceptor")
]);

const gdz = angular.module("angleGrinder.gridz");

gdz.config([
  "agDateFilterProvider", provider => // set default date format
provider.setDefaultFormat("MM/DD/YY H:mm a")
]);

gdz.config([
  "agCurrencyFilterProvider", function(provider) {
    // set default currency format
    provider.setDefaultFormat("<%= amount %> <%= symbol %>");
    return provider.setDefaultSymbol("GBP");
  }
]);
