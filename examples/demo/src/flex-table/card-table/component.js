import template from './component.html'
import { people } from '../../data/sample'

class controller {
  foo = 'bar'
  peopleData = people
}

export default angular.module('ag.demo.flexCardDemo', [])
  .component('flexCardDemo', {
    template: template,
    controller: controller
    // controller: function() {
    //   this.randomAvatar = () => {
    //     return 'wtf'
    //   }
    // }
  }).name
