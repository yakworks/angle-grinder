// Import Resources
import 'ng-showdown' // markdown
// import 'angular-highlightjs'; //source code highlighter
import highlightjsModule from './highlightjs.component' // source code highlighter
// import 'highlight.js/styles/darkula.css'; // try darkula too
import 'highlight.js/styles/solarized-light.css'
// import 'highlight.js/styles/atom-one-light.css';

import demoSnippet from './demo-snippet.component'
import demoTitleCrumb from './demo-title-crumb.component'
import exampleSnippet from './example-snippet.component'
import './demo.scss'

// Register module, register component and export name
export default angular
  .module('module.demo.snippets', [
    'ng-showdown',
    highlightjsModule
  ])
  .component('demoSnippet', demoSnippet)
  .component('demoTitleCrumb', demoTitleCrumb)
  .component('exampleSnippet', exampleSnippet)
  .name
