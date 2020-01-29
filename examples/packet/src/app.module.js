import angular from 'angular'
import agMod from '~/angle-grinder'
import angular_translate from 'angular-translate'
import 'angular-translate-loader-static-files'
import fullscreen from './utils/fullscreen'
import truncate_filters from './utils/truncate.filters'

export default angular.module("app", [
  agMod,
  fullscreen,
  truncate_filters,
  angular_translate
]).name
