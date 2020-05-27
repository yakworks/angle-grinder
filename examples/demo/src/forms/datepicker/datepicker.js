import template from './datepicker.html'
import _ from 'lodash'

class controller {
  vm ={}
  vm1 = {
    jsDate: new Date(),
    isoDate: '2020-05-01',
    localDateTime: '2020-05-02T10:00',
    dateRange: {from: '2020-05-01', to: '2020-05-20'}
  }
  vm2 = {
    jsDate: '2021-01-01',
  }
  vm3 = {
    jsDate: '2021-01-01',
    isoDate: '2021-01-02',
    localDateTime: '2022-01-03T10:00',
    dateRange: {to: '2020-05-20'}
  }
  loadModelData(pos){
    this.vm = _.cloneDeep(this[`vm${pos}`])
  }
}

export default angular.module('ag.demo.datepicker', [])
  .component('datepickerDemo', {template, controller})
  .name
