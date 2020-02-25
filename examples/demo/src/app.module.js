import angular from 'angular'
import agModule from '~/angle-grinder'
import ngTranslateModule from 'angular-translate'
import 'angular-translate-loader-static-files'
import fullscreen from './utils/fullscreen'
import truncate_filters from './utils/truncate.filters'

// demo examples helpers
import snippetsModule from './utils/demo/demo.module'

// demo sections
import componentsModule from './components'
import formsModule from './forms'

// these can probably go away
// import 'prismjs/prism'
// import 'prismjs/themes/prism-twilight.css'
// import 'angular-snippets/dist/angular-snippets'
// import 'angular-snippets/dist/themes/bootstrap-tabs/style.css'
// import 'angular-snippets/dist/themes/bootstrap-tabs/theme.js'


export default angular.module('app', [
  agModule,
  snippetsModule,
  componentsModule,
  formsModule,
  fullscreen,
  truncate_filters,
  ngTranslateModule, //remove this, only here to get demo working
  // 'Snippets',
  // 'SnippetsThemeBootstrapTabs'
]).name
