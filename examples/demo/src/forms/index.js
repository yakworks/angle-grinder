// import buttonsModule from './buttons'
import horSandModule from './horizontal-sandbox'
import validateSandModule from './validations-sandbox'
import compsModule from './components'
import selectModule from './select'
import selectRestModule from './select-rest'
import select2Module from './select2'
import xeditModule from './xedit-form'

// export module name
export default angular
  .module('demo.forms', [
    compsModule,
    select2Module,
    selectModule,
    selectRestModule,
    xeditModule,
    horSandModule,
    validateSandModule
  ])
  .name
