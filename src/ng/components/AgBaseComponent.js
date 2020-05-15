import stringUtils from '../../utils/stringFomUtils'
import $log from '../../utils/Log'
import _ from 'lodash'

/* @ngInject */
export default class AgBaseComponent {
  id
  label
  name
  ngModelCtrl
  formCtrl
  value
  validationError
  minimumLength
  maximumLength
  placeholder
  isRequired = false
  hint
  type
  required
  clearable
  loading
  placeholder
  errors

  constructor($element, $timeout) {
    this.$element = $element
    this.$timeout = $timeout
  }

  onInit() {
    this.id = this.id || _.uniqueId(`${this.name}_`)
    $log.debug(`[${this.id}] - formCtrl`, this.formCtrl)

    this.type = this.type || 'text'

    if (this.name && !this.label) {
      this.label = stringUtils.parseWords(this.name)
    }
    this.placeholder = this.placeholder || this.label?.toLowerCase()

    if (!this.maximumLength) {
      this.maximumLength = 50
    }
    // if required is added it wont be undefined and may have blank str if no value is set
    if (this.required === '' || this.required === 'true') {
      this.isRequired = true
    }
    // if(this.minimumLength) {
    //  this.isRequired = true
    // }
    this.ngModelCtrl.$render = () => {
      this.value = this.ngModelCtrl.$viewValue
    }
  }

  onChange() {
    $log.debug('onChange', this)
    try {
      if (this.value && this.maximumLength && this.value.length > this.maximumLength) {
        this.value = this.value.substring(0, this.maximumLength)
      }
    } catch (e) {
      this.value = ''
      // log this to your system as a security message
    }
    this.ngModelCtrl.$setViewValue(this.value)
  }

  validate() {
    // run extra validation code here
    return true
  }

  $postLink() {
    this.$timeout(function() {
      // var elem = document.getElementById(this.gridId);
      // do something with elem now that the DOM has had it's bindings applied
    })
  }
}
