//require('angular')
import 'angular'
import '~/vendor'
import agMod from '~/angle-grinder'
//import '../styles/boot.less'
import compHtml from './static/comp.html'

const mod = angular.module('exampleApp', [
  agMod
])
mod.controller('testController', function() {
  this.hello = 'hello 1'
  console.log('hello 1')
})

mod.controller('testController2', function() {
  this.hello = 'hello 2!'
  console.log('hello 2')
})

mod.controller('testController3', $scope => {
  $scope.hello = 'hello 3!'
  console.log('hello 3')
})


//var compHtml = require('./static/comp.html')
mod.component('myComp', {
  //templateUrl: './static/comp.html'
  //template: compHtml
  template: compHtml
});

mod.component('myBar', {
  templateUrl: 'static/bar.html'
  //template: require('./static/bar.html')
});

// mod.run([ '$templateCache', ($templateCache) => {
//     $templateCache.put('/static/bar.html', require('./static/bar.html'));
// }])
// mod.component('heroDetail', {
//   templateUrl: 'static/heroDetail.html',
//   bindings: {
//     hero: '='
//   }
// });
