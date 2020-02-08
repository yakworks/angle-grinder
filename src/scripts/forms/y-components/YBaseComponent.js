import stringUtils from '../stringFomUtils'
import _ from 'lodash'
/* @ngInject */
export default class YBaseComponent {

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

  errors

  constructor($element, $timeout) {
    this.$element = $element
    this.$timeout = $timeout
  }

  onInit() {
    this.id = this.id || _.uniqueId(`${this.name}_`)
    this.logDebug(`[${this.id}] - pre onInit()`)
    console.log(`[${this.id}] - formCtrl`, this.formCtrl)
    this.type = this.type || 'text'

    if (this.name && !this.label) {
      this.label = stringUtils.parseWords(this.name)
    }
    this.placeholder = this.placeholder || this.label?.toLowerCase()

    //console.log('******** ngModelCtrl **********', this.ngModelCtrl)
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
    // this.ngModelCtrl.$viewChangeListeners.push(function() {
    //   console.log("******** viewChangeListeners **********")
    // });
    this.ngModelCtrl.$render = () => {
      this.value = this.ngModelCtrl.$viewValue
    }

  }

  onChange() {
    //console.log('******** onChange ********** this.value ', this.value)
    //console.log('******** onChange ********** this.ngModelCtrl ', this.ngModelCtrl)
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
    // console.log("this.name", this.name)
    // console.log("this.formCtrl", this.formCtrl)
    // let field = this.formCtrl.name
    // console.log("field", field)
    //this.errors = this.formCtrl[this.name].$error

    this.validationError = ''
    let valid = true

    if (this.value) {
      if (this.minimumLength && this.value.length < this.minimumLength) {
        this.validationError = `has a minium length of ${this.minimumLength}`
        valid = false
      }
      if (this.maximumLength && this.value.length > this.maximumLength) {
        this.validationError = `has a maximum length of ${this.maximumLength}`
        // log this to your system as a security message
        valid = false
      }
      if (this.type === 'email' && !stringUtils.isEmailValid(this.value)) {
        this.validationError = ' has invalid email format'
        valid = false
      }
      if (this.type === 'url' && !stringUtils.isUrlValid(this.value)) {
        this.validationError = ' has invalid url format'
        valid = false
      }
    } else {
      if (this.isRequired) {
        this.validationError = ` is required`
        valid = false
      }
    }
    this.logDebug(`[${this.id}] - validate: ${valid}, validationError: ${this.validationError}`)
    return valid
  }

  $postLink() {
    this.$timeout(function() {
      console.log('******* $postLink in $timeout')
      // var elem = document.getElementById(this.gridId);
      // do something with elem now that the DOM has had it's bindings applied
    })
  }

  logDebug(prefix) {
    // just an area to log shit out to console to figure out whats going on
    // this.$attrs.class = "foo"
    // this.$element.addClass('foo')
    // console.log("----------- Name ", this.name)
    // console.log("$element ", this.$element)
    // console.log("this.type ", this.type)
    // console.log(`this.$attrs.required ${this.$attrs['required']}`)
    // console.log(`this.$attrs.ngModel ${this.$attrs.ngModel}`)
    // if(this.$attrs.required != undefined && this.$attrs.required !== 'false' ){
    //   console.log("******* Has Required Attribute ********")
    // }
    console.log(prefix, this)
  }
}
