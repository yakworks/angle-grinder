import template from './datepicker.html'

class controller {
  vm = {
    predefinedLocalDate: '2020-05-25',
    predefinedLocalDateTime: '2020-05-24T10:00',
    predefinedDate: new Date(),

  }
}

export default angular.module('ag.demo.datepicker', [])
  .component('datepickerDemo', { template, controller })
  .name
