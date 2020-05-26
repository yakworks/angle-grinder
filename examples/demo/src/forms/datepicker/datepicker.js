import template from './datepicker.html'

class controller {
  vm = {
    jsDate: new Date(),
    isoDate: '2020-05-01',
    localDateTime: '2020-05-02T10:00'
  }
}

export default angular.module('ag.demo.datepicker', [])
  .component('datepickerDemo', {template, controller})
  .name
