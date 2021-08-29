import compDemoModule from './component'

const template = `
<ng-svelte-demo></ng-svelte-demo>
`
// export module name
export default angular
  .module(compDemoModule)
  .component('ngSvelteDemoIndex', {
    template: template
  }).name
