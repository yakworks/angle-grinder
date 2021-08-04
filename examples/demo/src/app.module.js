import angular from 'angular'
import agModule from 'angle-grinder/src/angle-grinder'

import ngTranslateModule from 'angular-translate'
import 'angular-translate-loader-static-files'
import fullscreen from './utils/fullscreen'
import truncateFilters from './utils/truncate.filters'

// app layout items
import packetLayoutModule from './packet'
import freshLayoutModule from './fresh'
import loginModule from './login'

// demo/examples/source panels
import snippetsModule from './utils/demo/demo.module'

// demo sections
import componentsModule from './components'
import formsModule from './controls'
import gridsModule from './grids'

// store
import dataApiModule from './store'

// fresh sidebar

export default angular.module('app', [
  agModule,
  dataApiModule,
  packetLayoutModule,
  freshLayoutModule,
  loginModule,
  snippetsModule,
  componentsModule,
  formsModule,
  gridsModule,
  fullscreen,
  truncateFilters,
  ngTranslateModule // remove this, only here to get demo working
]).name
