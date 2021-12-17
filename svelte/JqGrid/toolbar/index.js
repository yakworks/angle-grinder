import angular from 'angular'
import grid2Mod from '../module'
import gridzToolbar from './gridz-toolbar'
import gridzOptionsDropdown from './gridz-options-dropdown'
import tbButton from './tb-button'

angular.module(grid2Mod)
  .directive('gridzOptionsDropdown', gridzOptionsDropdown)
  .directive('gridzToolbar', gridzToolbar)
  .directive('tbButton', tbButton)
