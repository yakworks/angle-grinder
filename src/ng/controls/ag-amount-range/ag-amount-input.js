import AgBaseControl from '../AgBaseControl'

class Controller extends AgBaseControl {
  $onInit() {
    if (this.inputId) {
      this.elementId = this.inputId
    }
    super.initDefaults()

    this.ngModelCtrl.$render = () => {
      this.value = this.ngModelCtrl.$viewValue
    }
  }

  onChange() {
    this.ngModelCtrl.$setViewValue(this.value)
  }
}

const template = `
  <div class="control">
    <input
      class="input"
      type="number"
      ng-class="$ctrl.inputClass"
      placeholder="{{::$ctrl.placeholder}}"
      ng-model-options="{allowInvalid: true, debounce: 250}"
      name="{{::$ctrl.name}}"
      id="{{::$ctrl.inputId}}"
      ng-model="$ctrl.value"
      ng-change="$ctrl.onChange()"
      ng-required="{{::$ctrl.isRequired}}"
      ag-number
    >
  </div>
`

export default () => ({
  ...AgBaseControl.common.dir,
  template: template,
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    amountOptions: '<',
    inputId: '@'
  }
})
