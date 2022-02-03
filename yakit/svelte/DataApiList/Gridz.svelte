<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { get, writable } from 'svelte/store';
  import { onMount, onDestroy, tick } from 'svelte'
  import ListToolbar from './toolbar/ListToolbar.svelte'
  import EditPopover from './EditPopover.svelte'
  import SearchForm from './SearchForm.svelte'
  import DataApiListController from './DataApiListController'
  import GridDataApiCtrl from '@ag/gridz/GridDataApiCtrl'
  import { classNames } from '../shared/utils';
  import stringify from '@yakit/core/stringify';
  import growl from "@yakit/ui/growl"

  export let ctx = undefined
  export let dataApi = undefined
  export let gridId = undefined

  // export let restrictSearch = undefined

  let isConfigured = false
  let listController

  let gridCtrl = new GridDataApiCtrl()
  // if(dense || dense === '') gridCtrl.isDense = true

  let className = undefined;
  export { className as class };

  let classes

  $: classes = classNames(
    className,
    'gridz'
  )
  let stateStore
  let editSchema
  let searchSchema

  onMount(async () => {
    await setupListCtrl()
  });

  async function setupListCtrl() {
    listController = await DataApiListController({ dataApi, ctx })
    ctx = listController.ctx
    gridId = ctx.gridOptions.gridId
    stateStore = listController.ctx.stateStore
    setupToolbarOpts(ctx)
    //needs to be either
    editSchema = ctx.editPopover || ctx.editForm
    //needs to be either
    searchSchema = ctx.searchForm

    isConfigured = true
  }

  //add popover to the createBtn
  function setupToolbarOpts(ctx){
    let tbopts = ctx.toolbarOptions
    //it will always exists if tbopts is present so no null checks should be needed, just check class
    if(tbopts && tbopts.leftButtons.create.class !== 'hidden' ){
      tbopts.leftButtons.create['popoverId'] = `#${ctx.gridOptions.gridId}-popover-edit`
    }
  }

  function init(node) {
    gridCtrl.setupAndInit(node, ctx)
  }

  onDestroy(() => {
    gridCtrl.destroy()
  });

  /** called after successful submit of edit or create. Display message and sync grid*/
  function afterEdit(event){
    growl.success("saved successfully")
    // Log.debug("savedItem", event.detail)
    //this just updates the grid display and flashes the row to show it updated
    gridCtrl.saveRow(event.detail.id, event.detail)
  }

  /** fired action after search clicked*/
  async function searchAction(event){
    const searchVals = event.detail
    Log.debug("searchVals", searchVals)
    await listController.search(searchVals)
  }

</script>

{#if isConfigured }
  {#if searchSchema }
    <SearchForm listId={gridId} {ctx} schema={searchSchema} on:search={searchAction}/>
  {/if}
  <div use:init class="gridz-wrapper card m-0">
  {#if ctx.toolbarOptions }
   <ListToolbar {listController} options={ctx.toolbarOptions} />
  {/if}
  <table class={classes} class:is-dense={$stateStore.isDense}></table>
  <div class="gridz-pager"></div>
</div>

{#if editSchema }
<EditPopover listId={gridId} {dataApi} schema={editSchema} on:submitSuccess={afterEdit}/>
{/if}

<!-- <pre class="mb-4">state: {stringify($stateStore, null, 2)}</pre> -->
{:else}
<p>...loading</p>
{/if}


