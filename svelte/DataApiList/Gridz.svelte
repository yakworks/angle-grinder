<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { get, writable } from 'svelte/store';
  import { onMount, onDestroy, tick } from 'svelte'
  import ListToolbar from './toolbar/ListToolbar.svelte'
  import DataApiListController from './DataApiListController'
  import GridDataApiCtrl from '@ag/gridz/GridDataApiCtrl'
  import { classNames } from '../shared/utils';
  import stringify from '@yakit/core/stringify';

  export let ctx = undefined
  export let dataApi = undefined

  export let restrictSearch = undefined

  let isConfigured = false
  let listController

  let gridCtrl = new GridDataApiCtrl()
  // if(dense || dense === '') gridCtrl.isDense = true

  let className = undefined;
  export { className as class };

  let classes

  let stateStore

  $: classes = classNames(
    className,
    'gridz'
  )

  onMount(async () => {
    await setupListCtrl()
  });

  async function setupListCtrl() {
    listController = await DataApiListController({ dataApi, ctx })
    ctx = listController.ctx
    stateStore = listController.ctx.stateStore
    isConfigured = true
  }

  function init(node) {
    gridCtrl.setupAndInit(node, ctx)
  }

  onDestroy(() => {
    gridCtrl.destroy()
  });

</script>

{#if isConfigured }
<div use:init class="gridz-wrapper">
  {#if ctx.toolbarOptions }
  <ListToolbar {listController} options={ctx.toolbarOptions} />
  {/if}
  <table class={classes} class:is-dense={$stateStore.isDense}></table>
  <div class="gridz-pager"></div>
</div>
<!-- <pre class="mb-4">state: {stringify($stateStore, null, 2)}</pre> -->
{:else}
<p>...loading</p>
{/if}




