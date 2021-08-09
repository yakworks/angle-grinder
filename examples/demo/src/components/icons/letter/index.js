import angular from 'angular'

export default angular.module('demo.list.comps', [])
  .component('letterIcons', {
    controller: function() {
      this.text = 'Bill'
      this.size = 'sm'
      this.box = 'circle'
    },
    // implicit controllerAs: '$ctrl',
    template: require('./letterIcons.html')
  })
  .component('letterIconsList', {
  // implicit controllerAs: '$ctrl',
    template: function($element, $attrs) {
      console.log('$element', $element)
      console.log('$attrs.box', $attrs.box)
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
      let tpl = '<p>'
      alphabet.forEach(letter => {
      // size="{{$ctrl.letterIcon.size}}" box="{{$ctrl.letterIcon.box}}"
        tpl = tpl + `<letter-icon data="${letter}" box="${$attrs.box}"char-count="2" color="auto" class="margin-5"></letter-icon>`
      })
      tpl = tpl + '</p>'
      return tpl
    }
  })
  .name
