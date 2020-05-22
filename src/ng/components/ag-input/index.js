import AgBaseComponent from '../AgBaseComponent'
import compDefaults from '../utils/componentDirective'
import scopeDefaults from '../utils/scopeDefaults'

class Controller extends AgBaseComponent {
  /* @ngInject */
  constructor($element, $timeout) {
    super($element)
    this.$timeout = $timeout
  }

  $onInit() {
    super.onInit()
    if (!this.isHorizontal) this.isHorizontal = this.formCtrl.isHorizontal
    if (!this.labelClass && this.formCtrl.labelClass) this.labelClass = this.formCtrl.labelClass
    if (this.isHorizontal) this.labelClass = `column ${this.labelClass}`
  }

  $postLink() {
    this.$timeout(() => {
      if (this.isHorizontal && this.label) {
        // move label out and wrap with a column div
        const label = this.$element.find('label.label')
        var content = angular.element('<div class="columns"></div>')
        this.$element.wrap(content)
        this.$element.parent().prepend(label)
        // this.$element.replaceWith(content);
      }
    })
  }
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
    ngModel: '=',
    type: '@',
    minimumLength: '@',
    maximumLength: '@',
    isHorizontal: '@'
  }
  // link: function(scope, $element, attrs, ctrls) {
  //   let $ctrl = ctrls.inputCtrl
  //   let formCtrl = ctrls.formCtrl
  //   //console.log("$ctrl", $ctrl)
  //   //console.log("formCtrl", formCtrl)

  //   if($ctrl.isHorizontal) {
  //     //move label out and wrap on column
  //     let label = $element.find('label').first()
  //     label.addClass( "column" )
  //     console.log("label", label)

  //     $element.addClass( "column" )
  //     console.log("$element", $element)

  //     var content = angular.element('<div class="columns"></div>')
  //     //content.append(label);
  //     //content.append($element.contents());
  //     //content.append(tElement.children());
  //     //tElement.replaceWith(content);
  //     $element.wrap(content);

  //   }
  // }
})
