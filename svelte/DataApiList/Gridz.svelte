<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { onMount, onDestroy, tick } from 'svelte'
  import ListToolbar from './toolbar/ListToolbar.svelte'
  import DataApiListController from './DataApiListController'
  import GridDataApiCtrl from '@ag/gridz/GridDataApiCtrl'
  import { classNames } from '../shared/utils';
import stringify from 'angle-grinder/src/utils/stringify';

  export let ctx = undefined
  export let dataApi = undefined

  let isConfigured = false
  let listController

  let gridCtrl = new GridDataApiCtrl()
  // if(dense || dense === '') gridCtrl.isDense = true

  let className = undefined;
  export { className as class };

  let classes

  let state = {}

  $: classes = classNames(
    className,
    'gridz'
  )

  onMount(async () => {
    listController = await DataApiListController({ dataApi, ctx })
    ctx = listController.ctx
    state = listController.state
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
<div use:init class="gridz-wrapper">
  {#if ctx.toolbarOptions }
  <ListToolbar {listController} options={ctx.toolbarOptions} bind:state />
  {/if}
  <table class={classes} class:is-dense={state.isDense}></table>
  <div class="gridz-pager"></div>
</div>

{:else}
<p>...loading</p>
{/if}

<pre class="mb-4">state: {stringify(state, null, 2)}</pre>


