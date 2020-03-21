import angular from 'angular'
import agModule from '~/angle-grinder'

import ngTranslateModule from 'angular-translate'
import 'angular-translate-loader-static-files'
import fullscreen from './utils/fullscreen'
import truncate_filters from './utils/truncate.filters'

// app layout items
import layoutModule from './layout'

// demo/examples/source panels
import snippetsModule from './utils/demo/demo.module'

// demo sections
import componentsModule from './components'
import formsModule from './forms'

// fresh sidebar
import freshModule from './fresh'

export default angular.module('app', [
  agModule,
  layoutModule,
  snippetsModule,
  componentsModule,
  formsModule,
  fullscreen,
  truncate_filters,
  ngTranslateModule, // remove this, only here to get demo working
  freshModule
]).name
