import compDemoModule from './component'

const template = `
<org-show-demo></org-show-demo>
`
// export module name
export default angular
  .module(compDemoModule)
  .component('orgShowDemoIndex', {
    template: template
  }).name
