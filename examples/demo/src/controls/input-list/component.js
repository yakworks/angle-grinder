import template from './component.html'

class controller {
  vm = {
    nums: [],
    predefined: [
      'foo',
      'bar',
      'qwe',
      'asfdasf',
      'asdf',
      'qewr',
      'zxvszvx',
      'asdfadsf',
      'dfgsdfgsdg'
    ]
  }

  alert = () => {
    alert(this.vm.nums)
  }
}

export default angular.module('ag.demo.inputListDemo', [])
  .component('inputListDemo', { template, controller })
  .name
