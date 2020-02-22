/* eslint-disable no-useless-constructor, no-unused-vars */
import angular from 'angular'
import AgBaseComponent from '../AgBaseComponent'

const MOD_NAME = 'forms.ag-select'
export default MOD_NAME

/* @ngInject */
class controller extends AgBaseComponent {
  constructor($element, $timeout) {
    super($element, $timeout)
  }

  $onInit() {
    super.onInit()
    super.validate()
  }

  $postLink() {
    const el = this.$element
    const $sel = el.find('ng-transclude > select')
    // $sel.addClass("form-control")
    // el.find("ng-transclude > select").children().appendTo(el.find("select.comp_select"))

    this.$timeout(() => {
      // let $s = el.find("ng-transclude > select")
      // el.find("select.comp_select").append($s.children())
      // $s.children().appendTo(el.find("select.comp_select"))
      // $s.children().appendTo("select.comp_select");
    })
  }

  onChange() {
    super.onChange()
    super.validate()
  }
}

angular
  .module(MOD_NAME, [])
  .component('agSelect', {
    transclude: true,
    template: require('./ag-select2.comp.html'),
    controller: controller,
    controllerAs: 'cmpCtrl',
    require: {
      ngModelCtrl: 'ngModel'
    },
    bindings: {
      selectOptions: '<',
      label: '@',
      name: '@',
      required: '@'
    }
  })
