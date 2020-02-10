/**
 * source code files for the snippets directive in certain areas
 */
import xtformIndex from '!!raw-loader!./xtform//index.js';

angular.module('app').run(function($templateCache) {
  // xtForm
  $templateCache.put('./xtform/index.js', xtformIndex)
  $templateCache.put('./xtform/xtform.comp.html', require('./xtform/xtform.comp.html'))
})
