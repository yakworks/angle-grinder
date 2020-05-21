import compDefaults from '../utils/componentDirective'

class Controller {
  $onInit() {
    // if required is added it wont be undefined and may have blank str if no value is set
    if (this.required === '' || this.required === 'true' ||
        this.ngRequired === '' || this.ngRequired === 'true') {
      this.isRequired = true
    }
  }
}

export default () => ({
  ...compDefaults,
  template: require('./ag-label.html'),
  controller: Controller,
  scope: {
    label: '@',
    required: '@',
    ngRequired: '@'
  }
})
