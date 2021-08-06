// import buttonsModule from './buttons'
import validateSandModule from './validations-sandbox'
import inputsModule from './inputs'
import inputsWildModule from './input-wildcard'
import inputListModule from './input-list'
import selectModule from './select'
import selectRestModule from './select-rest'
import xeditModule from './xedit-form'
import checkboxModule from './checkbox'

import datepickerModule from './datepicker'
import textarea from './textarea'
import amount from './amount'
import formlyModule from './formly'

// export module name
export default angular
  .module('demo.forms', [
    inputsModule,
    inputsWildModule,
    selectModule,
    selectRestModule,
    checkboxModule,
    xeditModule,
    validateSandModule,
    datepickerModule,
    inputListModule,
    textarea,
    amount,
    formlyModule
  ])
  .name
