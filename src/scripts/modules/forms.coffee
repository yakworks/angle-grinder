forms = angular.module("angleGrinder.forms", [
  "angleGrinder.common"
  "ui.bootstrap"
  "$strap.directives"
])

# Configure AngularStrap datepicker
forms.value "$strapConfig",
  datepicker:
    language: "en"
    format: "mm/dd/yyyy"
    type: "iso"
    autoClose: true
    forceParse: false
