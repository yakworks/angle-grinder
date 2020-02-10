/**
 * source code files for the snippets directive in certain areas
 */
import validationsIndex from '!!raw-loader!./validations/index.js';

angular.module('app').run(function($templateCache) {
  $templateCache.put('./validations/index.js', validationsIndex)
  $templateCache.put('./validations/validations.comp.html', require('./validations/validations.comp.html'))
})
