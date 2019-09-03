module.exports =

  # list of files / patterns to load in the browser
  files: [
    "node_modules/jquery/dist/jquery.js"
    "node_modules/lodash/dist/lodash.js"
    "node_modules/phantomjs-polyfill/bind-polyfill.js"

    "node_modules/angular/angular.js"
    "node_modules/angular-animate/angular-animate.js"
    "node_modules/angular-route/angular-route.js"
    "node_modules/angular-resource/angular-resource.js"
    "node_modules/angular-sanitize/angular-sanitize.js"
    "node_modules/angular-mocks/angular-mocks.js"
    "node_modules/angular-scroll/angular-scroll.js"
    "node_modules/angular-ui-grid/ui-grid.js"

    "plugin/grails-app/assets/angleGrinder/js/application.js"
    "plugin/grails-app/assets/angleGrinder/js/modules/resources.js"

    "node_modules/free-jqgrid/js/grid.base.js"
    "node_modules/Select2/select2.js"
    "node_modules/angular-ui-select2/src/select2.js"
    "node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js"
    "node_modules/angular-xeditable/dist/js/xeditable.js"
    "node_modules/jquery-file-upload/js/jquery.uploadfile.js"
    "node_modules/moment/moment.js"
    "node_modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js"
    "node_modules/toastr/toastr.js"
    "node_modules/sweetalert/lib/sweet-alert.js"
    "node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js"

    "src/scripts/gridz/gridz.coffee"
    "src/scripts/utils/baseCtrl.coffee"
    "src/scripts/utils/alerts.coffee"

    "docs/templates/**/*.html"

    "src/scripts/common/common.coffee"
    "src/scripts/forms/forms.coffee"

    "src/scripts/common/**/*.coffee"
    "src/scripts/forms/**/*.coffee"
    "src/scripts/gridz/**/*.coffee"

    "docs/exampleApp/modules/**/*.coffee"
    "docs/exampleApp/application.coffee"
    "docs/exampleApp/routes.coffee"
    "docs/exampleApp/controllers/**/*.coffee"

    "docs/exampleApp/grids.coffee"
    "docs/exampleApp/grids/*.coffee"

    "tests/mocks.coffee"
    "tests/unit/fixtures/**/*.html"
    "tests/unit/helpers/**/*.coffee"
    "tests/unit/angleGrinder/**/*Spec.coffee"
    "tests/unit/exampleApp/**/*Spec.coffee"
  ]
