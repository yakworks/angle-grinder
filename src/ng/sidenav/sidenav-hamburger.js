import appState from '@yakit/ui/AppState'
import { toggleSidenav } from './ag-sidenav'

const template = `
<a class="appbar-hamburger-wrapper toolbar-item pl-0" >
  <div class="appbar-hamburger" ng-class="{'is-active': hamCtrl.appState.sidenav.open}"
    style="visibility: visible;">
    <svg width="1000px" height="1000px">
      <path class="path1" d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800">
      </path>
      <path class="path2" d="M 300 500 L 700 500"></path>
      <path class="path3" d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200">
      </path>
    </svg>
    <button class="appbar-hamburger-trigger" ng-click="hamCtrl.toggleSidenav()"></button>
  </div>
</a>
`
export default function sidenavHamburger() {
  return {
    restrict: 'E',
    replace: true,
    template: template,
    controller: function() {
      this.appState = appState
      this.toggleSidenav = toggleSidenav
    },
    controllerAs: 'hamCtrl',
    bindToController: true
  }
}
