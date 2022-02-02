`/// <reference types="svelte" />`
import ng = require('angular')
import jq = require('jquery')
declare global {
  var configData;
  var Log;
  var angular: typeof ng;
  var $: typeof jq;
  interface Window {
		$: typeof jq;
    angular: typeof ng;
	}
}

export { };
