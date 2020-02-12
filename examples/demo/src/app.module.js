import angular from 'angular'
import agMod from '~/angle-grinder'
import angular_translate from 'angular-translate'
import 'angular-translate-loader-static-files'
import fullscreen from './utils/fullscreen'
import truncate_filters from './utils/truncate.filters'

// demo resources
import 'ng-showdown' //markdown
import 'angular-highlightjs'; //source code highlighter
import 'highlight.js/styles/darkula.css'; // try darkula too
import Demo from './utils/demo/demo.module'

import DropdownDemo from './components/dropdown'

// these can probably go away
import 'prismjs/prism'
import 'prismjs/themes/prism-twilight.css'
import 'angular-snippets/dist/angular-snippets'
import 'angular-snippets/dist/themes/bootstrap-tabs/style.css'
import 'angular-snippets/dist/themes/bootstrap-tabs/theme.js'


export default angular.module('app', [
  'ng-showdown',
  'hljs',
  Demo,
  agMod,
  DropdownDemo,
  fullscreen,
  truncate_filters,
  angular_translate,
  'Snippets',
  'SnippetsThemeBootstrapTabs'
]).name
