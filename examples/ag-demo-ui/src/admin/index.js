import angular from "angular";
import adminOrg from './adminOrgModule'

const forms = angular.module("angleGrinder.forms");

//Just an example for configuring dates formats
forms.config([
  "agDateProvider", function(provider) {
    provider.setViewFormat("MM/DD/YY");
    return provider.setLocalDateFormat("YYYY-MM-DD");
  }
]);
