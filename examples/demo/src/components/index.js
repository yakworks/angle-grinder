// import buttonsModule from './buttons'
import dropdownModule from './dropdown'
import buttonModule from './button'
import toolbarModule from './toolbar'
import contextMenuMod from './contextMenu'
import sweetalertMod from './sweetalert'
import toastMod from './toast'
import tabsMod from './tabs'
import iconsMod from './icons'
import tilesDemoMod from './tiles'
// import modalsMod from './modals'

// export module name
export default angular
  .module('demo.components', [
    buttonModule,
    dropdownModule,
    toolbarModule,
    contextMenuMod,
    sweetalertMod,
    toastMod,
    tabsMod,
    iconsMod,
    tilesDemoMod
  ])
  .name
