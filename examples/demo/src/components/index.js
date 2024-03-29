// import buttonsModule from './buttons'
import dropdownModule from './dropdown'
import buttonModule from './button'
import toolbarModule from './toolbar'
import contextMenuMod from './contextMenu'
import sweetalertMod from './sweetalert'
import tabsMod from './tabs'
import iconsMod from './icons'
import tilesDemoMod from './tiles'
import listsDemoMod from './lists'
import chartsDemoMod from './charts'
import cardsDemoMod from './cards'
import avatarsDemoMod from './avatars'
// import modalsMod from './modals'

// export module name
export default angular
  .module('demo.components', [
    buttonModule,
    dropdownModule,
    toolbarModule,
    contextMenuMod,
    sweetalertMod,
    tabsMod,
    iconsMod,
    tilesDemoMod,
    listsDemoMod,
    chartsDemoMod,
    cardsDemoMod,
    avatarsDemoMod
  ])
  .name
