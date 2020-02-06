import stringUtils from '../stringFomUtils'
import _ from 'lodash';

export default class InputBaseComponent {

	label
	ngModelCtrl
  value
  name
	id
	validationError
	minimumLength
  maximumLength
  placeholder
	isRequired = false
  helpMessage
  type
  required

	constructor($element, $timeout) {
    this.$element = $element
    this.$timeout = $timeout
	}

	onInit() {
    this.logDebugs()
    // if required is added it wont be undefined and will have blank str if no value is set
    if(this.required == "" || this.required == "true"){
      this.isRequired = true
    }
    this.type = this.type || "text"
    console.log("******** id **********", this.id)
    this.id = this.id || _.uniqueId(`${this.name}_`)
    console.log("******** id **********", this.id)
    if(this.name && !this.label) {
      this.label = stringUtils.parseWords(this.name)
    }
    this.placeholder = this.placeholder || this.label?.toLowerCase()

		this.ngModelCtrl.$render = () => {
			this.value = this.ngModelCtrl.$viewValue
    }
    console.log("******** ngModelCtrl **********", this.ngModelCtrl)
		if(!this.maximumLength) {
			this.maximumLength = 50
		}
		// if(this.minimumLength) {
		// 	this.isRequired = true
    // }
    // this.ngModelCtrl.$viewChangeListeners.push(function() {
    //   console.log("******** viewChangeListeners **********")
    // });
  }

	onChange() {
    console.log("******** onChange ********** this.value ", this.value)
    console.log("******** onChange ********** this.ngModelCtrl ", this.ngModelCtrl)
		try {
			if(this.value && this.maximumLength && this.value.length > this.maximumLength) {
				this.value = this.value.substring(0, this.maximumLength)
			}
		} catch(e) {
			this.value = ''
			// log this to your system as a security message
		}
		this.ngModelCtrl.$setViewValue(this.value)
	}

	validate() {
		if(this.isRequired && this.minimumLength) {
			if(!this.value || this.value.length < this.minimumLength) {
				this.validationError = `has a minium length of ${this.minimumLength}`
				return false
			}
    }
    if(this.value){
      if(this.maximumLength && this.value.length > this.maximumLength) {
        this.validationError = `has a maximum length of ${this.maximumLength}`
        // log this to your system as a security message
        return false
      }
      if(this.type === 'email' && !stringUtils.isEmailValid(this.value)){
        this.validationError = ' has invalid email format'
        return false
      }
      if(this.type === 'url' && !stringUtils.isUrlValid(this.value)) {
				this.validationError = ' has invalid url format'
				return false
			}
    }

		this.validationError = ''
		return true
  }

  $postLink() {
    this.$timeout(function() {
      console.log("******* $postLink in $timeout")
      //var elem = document.getElementById(this.gridId);
      // do something with elem now that the DOM has had it's bindings applied
    });
  }

  logDebugs(){
    // just an area to log shit out to console to figure out whats going on
        //this.$attrs.class = "foo"
    // this.$element.addClass('foo')
    // console.log("----------- Name ", this.name)
    // console.log("$element ", this.$element)
    //console.log("this.type ", this.type)
    // console.log(`this.$attrs.required ${this.$attrs['required']}`)
    // console.log(`this.$attrs.ngModel ${this.$attrs.ngModel}`)
    // if(this.$attrs.required != undefined && this.$attrs.required !== 'false' ){
    //   console.log("******* Has Required Attribute ********")
    // }
    console.log("InputBaseComponent", this)
  }

}
