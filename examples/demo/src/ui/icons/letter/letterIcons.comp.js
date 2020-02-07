import angular from 'angular'

angular.module('app')
  .component('letterIcons', {
    controller: function() {
      this.text = 'Bill'
      this.size = 'sm'
      this.box = 'circle'
    },
    // implicit controllerAs: '$ctrl',
    template: require('./letterIcons.html')
  })
