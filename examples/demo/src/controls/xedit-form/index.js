import xedit1Module from './xedit1'


const template = `
<demo-title-crumb></demo-title-crumb>
<div class="container-fluid container-fullw buttonDemoIndex">
  <xedit1-example></xedit1-example>
</div>
`
// export module name
export default angular
  .module('ag.demo.xedit-all', [
    xedit1Module
    // agSelectModule
  ])
  .component('xeditDemoIndex', { template })
  .name
