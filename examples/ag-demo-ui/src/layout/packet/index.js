import footerModule from './footer'
import sidenavModule from './sidenav'
import appbarModule from './appbar'

// export module name
export default angular
  .module('demo.layout', [
    footerModule,
    sidenavModule,
    appbarModule
  ])
  .name
