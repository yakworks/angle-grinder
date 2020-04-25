import angular from 'angular'
import agModule from '~/angle-grinder'

import ngTranslateModule from 'angular-translate'
import 'angular-translate-loader-static-files'
import fullscreen from '../utils/fullscreen'
import truncateFilters from '../utils/truncate.filters'
// app layout items
import packetLayoutModule from './packet'
import freshLayoutModule from './fresh'
// fresh sidebar

export default angular.module('app', [
  agModule,
  packetLayoutModule,
  freshLayoutModule,
  fullscreen,
  truncateFilters,
  ngTranslateModule // remove this, only here to get demo working
]).name
