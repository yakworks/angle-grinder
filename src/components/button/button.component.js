import _ from 'lodash'
import template from './button.html'

// Set up controller
class BtnController {

  constructor($element) {
    this.$element = $element
  }

  $onInit() {
    this.btnCls = this.buttonClass || ''
    // setup color class
    if(this.color) this.btnCls = `${this.btnCls} is-${this.color}`

  }

  fireClick(event) {
    if (_.isFunction(this.buttonClick)) { // if there is a default then use it
      this.buttonClick(event)
    }
  }

  get ngClass(){
    //let self = this
    return {
      'is-loading': this.isLoading,
    }
  }

}

// Define and export component
export default {
  transclude: true,
  bindings: {
    buttonClass: '@',
    color: '@',
    // iconLeft: '@',
    // iconRight: '@',
    isLoading: '<',
    isDisabled: '<',
    // size: '@',
    buttonClick: '='
  },
  template,
  controller: BtnController
}
