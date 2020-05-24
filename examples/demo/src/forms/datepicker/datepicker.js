import template from './datepicker.html'

class controller {
  vm = {
    predefined: {
      localDate: '2020-05-25',
      localDateTime: '2020-05-24T10:00',
      date: new Date()
    }

  }
}

export default angular.module('ag.demo.datepicker', [])
  .component('datepickerDemo', {template, controller})
  .name
