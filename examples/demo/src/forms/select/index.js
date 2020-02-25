import basicModule from './basic'
import selFromDataModule from './selFromData'
//import agSelectModule from './selects'
import './styles.scss'

const template = `
<demo-title-crumb></demo-title-crumb>
<div class="container-fluid container-fullw buttonDemoIndex">
  <ex-sel-basic/>
  <ex-sel-data/>
</div>
`
// export module name
export default angular
  .module('ag.demo.sel2-all', [
    basicModule,
    selFromDataModule,
    //agSelectModule
  ])
  .component('sel2DemoIndex', { template })
  .name
