import buttonDemoModule from './button-demo-example'
//import buttonIconModule from './button-icon-example'

class controller {

}

const template = `
<demo-title-crumb></demo-title-crumb>
<div class="container-fluid container-fullw">
  <button-demo-example></button-demo-example>
  <button-icon-example></button-icon-example>
</div>
`

export default angular
  .module('module.demo.buttons-all',[
    buttonDemoModule,
    //buttonIconModule
  ])
  .component('buttonsIndex', {
    template,
    controller
  })
  .name
