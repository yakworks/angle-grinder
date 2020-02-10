import angular from 'angular'
import agMod from '~/angle-grinder'
import angular_translate from 'angular-translate'
import 'angular-translate-loader-static-files'
import fullscreen from './utils/fullscreen'
import truncate_filters from './utils/truncate.filters'
import 'prismjs/prism'
import 'prismjs/themes/prism-twilight.css'
import 'angular-snippets/dist/angular-snippets'
import 'angular-snippets/dist/themes/bootstrap-tabs/style.css'
import 'angular-snippets/dist/themes/bootstrap-tabs/theme.js'

export default angular.module('app', [
  agMod,
  fullscreen,
  truncate_filters,
  angular_translate,
  'Snippets',
  'SnippetsThemeBootstrapTabs'
]).name
