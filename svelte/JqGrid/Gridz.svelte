<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { onMount, onDestroy, tick } from 'svelte'
  import DataApiListController from '../common/DataApiListController'
  import GridDataApiCtrl from '@ag/gridz/GridDataApiCtrl'
  import { classNames } from '../shared/utils';

  export let ctx = undefined
  export let dataApi = undefined
  export let dense = undefined

  let isConfigured = false
  let listDataCtrl
  let gridCtrl = new GridDataApiCtrl()

  let className = undefined;
  export { className as class };

  onMount(async () => {
    listDataCtrl = await DataApiListController({ dataApi, ctx })
    ctx = listDataCtrl.ctx
    isConfigured = true
	});

  function init(node) {
    console.log("grid init", ctx)
    gridCtrl.setupAndInit(node, ctx)
  }

  onDestroy(() => {
    gridCtrl.destroy()
  });

</script>

{#if isConfigured }

<!-- <JqGrid ctx={listDataCtrl.ctx} gridId={listDataCtrl.gridId()} /> -->
<div use:init class="gridz-wrapper">
  <table class="gridz" class:is-dense={dense}></table>
  <div class="gridz-pager"></div>
</div>

{:else}
<p>...loading</p>
{/if}




