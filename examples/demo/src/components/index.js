// import buttonsModule from './buttons'
import dropdownModule from './dropdown'
import buttonModule from './button'
import toolbarModule from './toolbar'
import contextMenuMod from './contextMenu'

// export module name
export default angular
  .module('demo.components', [
    buttonModule,
    dropdownModule,
    toolbarModule,
    contextMenuMod
  ])
  .name
