import template from './tag-input.html'

class controller {
  vm = {
    nums: '',
    predefined: 'foo,bar,qwe,asfdasf,asdf,qewr,zxvszvx,asdfadsf,dfgsdfgsdg'
  }
  alert = () => {
    alert(this.vm.nums)
  }
}

export default angular.module('ag.demo.tagInput', [])
  .component('tagInputDemo', { template, controller })
  .name
