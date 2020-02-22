// import buttonsModule from './buttons'
import dropdownModule from './dropdown/dropdown.module'
import buttonModule from './button/button.module'

// export module name
export default angular
  .module('ag.components', [
    buttonModule,
    dropdownModule
  ])
  .name
