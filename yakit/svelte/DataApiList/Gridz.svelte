<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { get, writable } from 'svelte/store';
  import { onMount, onDestroy, tick, createEventDispatcher } from 'svelte'
  import ListToolbar from './toolbar/ListToolbar.svelte'
  import EditPopover from './EditPopover.svelte'
  import SearchForm from './SearchForm.svelte'
  import DataApiListController from './DataApiListController'
  import GridDataApiCtrl from '@ag/gridz/GridDataApiCtrl'
  import { classNames } from '../shared/utils';
  import stringify from '@yakit/core/stringify';
  import growl from "@yakit/ui/growl"
  import { get as _get, uniqueId } from "@yakit/core/dash"

  /** the grid context with gridOptions and toolbarOptions */
  export let ctx = undefined
  /** the dataApi that feeds tihs */
  export let dataApi = undefined
  /** the gridId, can be bound, should set this through the gridOptions and not here*/
  export let gridId = undefined
  /** bind to the grid controller to access the instance*/
  export let gridCtrl = undefined
  /** toolbar title */
  export let title = undefined
  /** the quickfilter buttons to add to toolbar */
  export let QuickFilter = undefined

  gridCtrl = new GridDataApiCtrl()

  // export let restrictSearch = undefined

  let inialized = false
  let listController

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
  let searchFormEnabled

  onMount(async () => {
    await setupListCtrl()
  });

  async function setupListCtrl() {
    listController = await DataApiListController({ dataApi, ctx })
    ctx = listController.ctx
    gridId = ctx.gridOptions.gridId = ctx.gridOptions.gridId  || dataApi.key.replace('/', '_')
    stateStore = listController.ctx.stateStore
    searchFormEnabled = _get(ctx, 'gridOptions.searchFormEnabled', true)
    setupToolbarOpts(ctx)
    //needs to be either
    editSchema = ctx.editPopover || ctx.editForm
    //needs to be either
    searchSchema = ctx.searchForm

    inialized = true
  }

  //add popover to the createBtn
  function setupToolbarOpts(ctx){
    let tbopts = ctx.toolbarOptions
    //it will always exists if tbopts is present so no null checks should be needed, just check class
    if(tbopts && tbopts.leftButtons.create.class !== 'hidden' ){
      tbopts.leftButtons.create['popoverId'] = `#${gridId}-popover-edit`
    }
  }

  function init(node) {
    gridCtrl.setupAndInit(node, ctx)
  }

  onDestroy(() => {
    gridCtrl.destroy()
  });

  const dispatch = createEventDispatcher();

  /** called after successful submit of edit or create. Display message and sync grid*/
  function afterEdit(event){
    //this just updates the grid display and flashes the row to show it updated
    gridCtrl.addOrUpdateRow(event.detail.id, event.detail)
    growl.success("saved successfully")
    //refire in case we want to do something
    dispatch( 'afterEditSubmit' , event.detail)
  }

  /** fired action after search clicked*/
  async function searchAction(event){
    const searchVals = event.detail
    await listController.search(searchVals)
  }

</script>

{#if inialized }
  {#if searchSchema && searchFormEnabled }
    <SearchForm listId={gridId} {ctx} schema={searchSchema} on:search={searchAction}/>
  {/if}
  <div use:init class="gridz-wrapper card m-0">
  {#if ctx.toolbarOptions }
    <ListToolbar listId={gridId} {title} {listController} opts={ctx.toolbarOptions} {QuickFilter}/>
  {/if}
  <table class={classes} class:is-dense={$stateStore.isDense}></table>
  <div class="gridz-pager"></div>
</div>

{#if editSchema }
<EditPopover listId={gridId} {dataApi} schema={editSchema} on:afterEditSubmit={afterEdit} on:beforeEditSubmit/>
{/if}

<!-- <pre class="mb-4">state: {stringify($stateStore, null, 2)}</pre> -->
{:else}
<p>...loading</p>
{/if}


