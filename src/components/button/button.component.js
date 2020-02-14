// Import Template
import template from './button.html'

// Set up controller
class Controller {

  constructor($element) {
    this.$element = $element
  }

  $onInit() {
    let btnCls = this.buttonClass || ''
    // setup defaults
    if(this.color) btnCls = `${btnCls} is-${this.color}`
    //this.colorClass = this.color ? `is-${this.color}` : ''
    // console.log("------this.colorClass", this.colorClass)
    // // if disabled is added it wont be undefined and may have blank str if no value is set
    // this.disabled = (this.disabled === '' || this.disabled === 'true')
    // this.isLoading = (this.isLoading === '' || this.isLoading === 'true')
    // btnClass = this.isLoading ? `${btnClass} is-loading` : btnClass

    // console.log("------this.classes", this.classes)
    this.buttonClass = btnCls
  }

  fireClick(event) {
    if (typeof this.buttonClick === "function") { // if there is a default then use it
      this.buttonClick(event)
    }
  }

  //get ngClass(){
    // return {
    //   'is-loading': this.loading,
    // }
    // return {
    //   'is-rounded': this.rounded,
    //   'is-loading': this.loading,
    //   'is-outlined': this.outlined,
    //   'is-fullwidth': this.expanded,
    //   'is-inverted': this.inverted,
    //   'is-focused': this.focused,
    //   'is-active': this.active,
    //   'is-hovered': this.hovered,
    //   'is-selected': this.selected
    // }
  }

//}

// Define and export component
export default {
  transclude: true,
  bindings: {
    buttonClass: '@',
    color: '@',
    // iconLeft: '@',
    // iconRight: '@',
    // isLoading: '@',
    // disabled: '<',
    // size: '@',
    buttonClick: '='
  },
  template,
  controller: Controller
}
