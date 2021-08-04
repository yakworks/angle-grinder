import template from './index.html'
import appbarModule from './appbar'

export default angular
  .module('demo.fresh', [appbarModule])
  .component('freshApp', { template })
  .name
