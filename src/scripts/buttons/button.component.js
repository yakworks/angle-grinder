// Import Template
import template from './button.html'

// Set up controller
class Controller {
  constructor($element) {
    this.$element = $element
  }

  $onInit() {
    // setup defaults
    this.type = this.type || 'default'
    // if disabled is added it wont be undefined and may have blank str if no value is set
    this.disabled = (this.disabled === '' || this.disabled === 'true')
    this.loading = (this.loading === '' || this.loading === 'true')

    if (this.disabled === '' || this.disabled === 'true') {
      this.disabled = true
    }
  }

  fireClick(event) {
    if (this.ngClick) { // if there is a default then use it
      this.ngClick(event)
    }
  }
}

// Define and export component
export default {
  transclude: true,
  bindings: {
    label: '@',
    tag: '@',
    iconLeft: '@',
    iconRight: '@',
    type: '@',
    loading: '<',
    disabled: '<',
    size: '@',
    ngClick: '='
  },
  template,
  controller: Controller
}
