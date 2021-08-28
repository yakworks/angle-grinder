import template from './component.html'
import { people } from '../../data/sample'

class controller {
  foo = 'bar'
  avatarData = people

  get randomAvatar(){
  // randomAvatar(){
    const idx = Math.floor((Math.random() * (9 - 0)) + 0)
    // const idx = Math.random() * (0 - 9) + 0
    console.log('random idx', idx)
    // const avatar = people[idx].avatar
    // return `/assets/images/photos/${avatar}`
    return 'WTF'
  }

  $onInit() {
    const dta = _.cloneDeep(people).slice(0, 6)
    dta[0].size = 'is-small'
    dta[1].size = '' // nothing is is-normal
    dta[2].size = 'is-medium'
    dta[3].size = 'is-large'
    dta[4].size = 'is-big'
    dta[5].size = 'is-xl'

    this.avatarData = dta
  }
}

export default angular.module('ag.demo.avatarDemo', [])
  .component('avatarDemo', {
    template: template,
    controller: controller
    // controller: function() {
    //   this.randomAvatar = () => {
    //     console.log('wtf')
    //     return 'wtf'
    //   }
    // }
  }).name
