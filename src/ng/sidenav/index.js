import agSidenav from './ag-sidenav'
import sidenavHamburger from './sidenav-hamburger'

export default angular.module('ag.sidenav', [])
  .component('agSidenav', agSidenav)
  .directive('sidenavHamburger', sidenavHamburger)
  .name
