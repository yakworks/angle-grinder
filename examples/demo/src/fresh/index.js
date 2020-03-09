import './styles/_index.scss'
import template from './index.html';
import sidenavModule from './sidenav'
import appbarModule from './appbar'
import * as sidenav from './sidenav/sidenav'

// import appRoot from '../routerStates.js'
// import appState from 'angle-grinder/src/tools/AppState'

class controller {

  constructor(){
    this.msg = "hello"
  }

  toggleSidenav(){
    sidenav.toggle()
  }

}

export default angular
  .module('demo.fresh', [ sidenavModule, appbarModule ])
  .component('freshApp', { template, controller })
  .name;
