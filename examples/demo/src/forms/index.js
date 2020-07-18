// import buttonsModule from './buttons'
import horSandModule from './horizontal-sandbox'
import validateSandModule from './validations-sandbox'
import compsModule from './inputs'
import selectModule from './select'
import selectRestModule from './select-rest'
import select2Module from './select2-sandbox'
import xeditModule from './xedit-form'
import checkboxModule from './checkbox'
import inputListModule from './input-list'
import datepickerModule from './datepicker'
import textarea from './textarea'
import amount from './amount'
import formlyModule from './formly'

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
    datepickerModule,
    inputListModule,
    textarea,
    amount,
    formlyModule
  ])
  .name
