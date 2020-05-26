import template from './datepicker.html'

class controller {
  vm = {
    jsDate: new Date(),
    isoDate: '2020-05-01',
    localDateTime: '2020-05-02T10:00'
  }
  vm2 = {
    jsDate: '2021-01-01',
    isoDate: '2021-01-02',
    localDateTime: '2022-01-03T10:00'
  }
  changeModelData(){
    this.vm = this.vm2
  }
}

export default angular.module('ag.demo.datepicker', [])
  .component('datepickerDemo', {template, controller})
  .name
