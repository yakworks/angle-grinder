import AgBaseComponent from '../AgBaseComponent'
import compDefaults from '../utils/componentDirective'
import scopeDefaults from '../utils/scopeDefaults'

class Controller extends AgBaseComponent {
  /* @ngInject */
  // constructor($element, $timeout) {
  //   super($element,$timeout)
  // }

  $onInit() {
    super.onInit()
  }

  // $postLink() {
  //   this.$timeout(() => {
  //     if (this.isHorizontal && this.label) {
  //       // move label out and wrap with a column div
  //       const label = this.$element.find('label.label')
  //       var content = angular.element('<div class="columns"></div>')
  //       this.$element.wrap(content)
  //       this.$element.parent().prepend(label)
  //       // this.$element.replaceWith(content);
  //     }
  //   })
  // }
}

export default () => ({
  ...compDefaults,
  template: require('./ag-input.html'),
  controller: Controller,
  require: {
    inputCtrl: 'agInput',
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...scopeDefaults.formComp,
    // ngModel: '=',
    type: '@',
    minimumLength: '@',
    maximumLength: '@'
  }
})
