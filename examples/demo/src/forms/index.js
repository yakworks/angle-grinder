// import buttonsModule from './buttons'
import horSandModule from './horizontal-sandbox'
import validateSandModule from './validations-sandbox'
import compsModule from './inputs'
import selectModule from './select'
import selectRestModule from './select-rest'
import select2Module from './select2-sandbox'
import xeditModule from './xedit-form'
import checkboxModule from './checkbox'
import datepickerModule from './datepicker'

// export module name
export default angular
  .module('demo.forms', [
    compsModule,
    select2Module,
    selectModule,
    selectRestModule,
    checkboxModule,
    xeditModule,
    horSandModule,
    validateSandModule,
    datepickerModule
  ])
  .name
