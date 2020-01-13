function importAll (r) {
  r.keys().forEach(r);
}

//require('./scripts/application')
require('./scripts/select2')
require('./scripts/utils/deepDiff.js')
require('./scripts/utils/isFalsy.js')
//require('./scripts/select2/uiSelect2.js.js')
//require('./scripts/gridz/gridz.js')
//require('./scripts/utils/alerts.js')
//require('docs/templates/**/*.html')
//require('./scripts/forms/forms.js')

//importAll(require.context('./scripts/common/', true, /\.js$/))
//importAll(require.context('./scripts/forms/', true, /\.js$/))
//importAll(require.context('./scripts/gridz/', true, /\.js$/))

//order here copied from karma-files.js

//{ pattern: "plugin/grails-app/assets/angleGrinder/js/application.js"},
//{ pattern: "plugin/grails-app/assets/angleGrinder/js/modules/resources.js"},
// { pattern: "src/select2/uiSelect2.js"},
//     { pattern: "src/scripts/gridz/gridz.js"},
//     { pattern: "src/scripts/utils/baseCtrl.js"},
//     { pattern: "src/scripts/utils/alerts.js"},

//     { pattern: "docs/templates/**/*.html"},

//     { pattern: "src/scripts/common/common.js"},
//     { pattern: "src/scripts/forms/forms.js"},

//     { pattern: "src/scripts/common/**/*.js"},
//     { pattern: "src/scripts/forms/**/*.js"},
//     { pattern: "src/scripts/gridz/**/*.js"},
