module.exports = {

  // list of files / patterns to load in the browser
  files: [
    { pattern: "node_modules/jquery/dist/jquery.js"},
    { pattern: "node_modules/lodash/lodash.js"},
    { pattern: "node_modules/phantomjs-polyfill/bind-polyfill.js"},

    { pattern: "node_modules/angular/angular.js"},
    { pattern: "node_modules/angular-animate/angular-animate.js"},
    { pattern: "node_modules/angular-route/angular-route.js"},
    { pattern: "node_modules/angular-resource/angular-resource.js"},
    { pattern: "node_modules/angular-sanitize/angular-sanitize.js"},
    { pattern: "node_modules/angular-mocks/angular-mocks.js"},
    { pattern: "node_modules/angular-scroll/angular-scroll.js"},
    { pattern: "node_modules/angular-ui-grid/ui-grid.js"},

    { pattern: "plugin/grails-app/assets/angleGrinder/js/application.js"},
    { pattern: "plugin/grails-app/assets/angleGrinder/js/modules/resources.js"},

    { pattern: "node_modules/free-jqgrid/js/jquery.jqgrid.src.js"},
    { pattern: "node_modules/Select2/select2.js"},
    { pattern: "node_modules/angular-ui-select2/src/select2.js"},
    { pattern: "node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js"},
    { pattern: "node_modules/angular-xeditable/dist/js/xeditable.js"},
    { pattern: "node_modules/jquery-file-upload/js/jquery.uploadfile.js"},
    { pattern: "node_modules/moment/moment.js"},
    { pattern: "node_modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js"},
    { pattern: "node_modules/toastr/toastr.js"},
    { pattern: "node_modules/sweetalert/lib/sweet-alert.js"},
    { pattern: "node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js"},

    { pattern: "src/scripts/gridz/gridz.js"},
    { pattern: "src/scripts/utils/baseCtrl.js"},
    { pattern: "src/scripts/utils/alerts.js"},

    { pattern: "docs/templates/**/*.html"},

    { pattern: "src/scripts/common/common.js"},
    { pattern: "src/scripts/forms/forms.js"},

    { pattern: "src/scripts/common/**/*.js"},
    { pattern: "src/scripts/forms/**/*.js"},
    { pattern: "src/scripts/gridz/**/*.js"},

    { pattern: "docs/exampleApp/modules/**/*.coffee"},
    { pattern: "docs/exampleApp/application.coffee"},

    { pattern: "docs/exampleApp/grids.coffee"},
    { pattern: "docs/exampleApp/grids/*.coffee"},


    { pattern: "tests/mocks.js"},
    { pattern: "tests/unit/fixtures/**/*.html"},
    { pattern: "tests/unit/helpers/**/*.js"},

    { pattern: "tests/unit/angleGrinder/**/*Spec.js"}
  ]
};
