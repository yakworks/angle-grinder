import template from './component.html'

class controller {
  vm = {}

  fillData = () => {
    this.vm.invalidData = '12e'
    this.vm.expData = '12e04'
    this.vm.validDataString = '12.34'
    this.vm.validDataNumber = 12.56
  }

  resetData = () => {
    this.vm = {}
  }
}

export default angular.module('demo.amountDemo', [])
  .component('amountExample', { template, controller })
  .name
