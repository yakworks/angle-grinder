// Import Resources
import demoSnippet from './demo-snippet.component';
import demoTitleCrumb from './demo-title-crumb.component';
import './demo.scss';

// Register module, register component and export name
export default angular
  .module('module.docs.demo', [])
  .component('demoSnippet', demoSnippet)
  .component('demoTitleCrumb', demoTitleCrumb)
  .name;
