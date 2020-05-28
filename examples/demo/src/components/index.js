// import buttonsModule from './buttons'
import dropdownModule from './dropdown'
import buttonModule from './button'
import toolbarModule from './toolbar'

// export module name
export default angular
  .module('demo.components', [
    buttonModule,
    dropdownModule,
    toolbarModule
  ])
  .name
