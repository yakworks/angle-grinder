<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { fade, fly } from "svelte/transition";
  import {Button, Button7, Segmented} from '@ag-svelte/index'
  import TbButton from './TbButton.svelte'
  import QuickFilter from './QuickFilter.svelte'
  import { merge } from '@ag/utils/dash';
  import { classNames } from '../../shared/utils'
  import ListOptionsPopover from './ListOptionsPopover.svelte'

  //toolbar options
  export let title = undefined
  export let options = {}
  export let listController

  $: stateStore = listController.ctx.stateStore

  let isLoading = false

  let opts = options

  //turn object to array with key field and returns only visible
  function filterVisible(buttonOpts){
    return Object.entries(buttonOpts)
      .map(( [key, v] ) => ({ key, ...v })) //turn into array with key as key
      .filter(o => o.class !== 'hidden')
  }

  let qSearchEntry = ''

  function clearSearchInput() {
    qSearchEntry = ''
    listController.quickSearch('')
  }

  function toggleShowSearch() {
    $stateStore.showSearchForm = !$stateStore.showSearchForm
  }

  const onSearchKeyPress = e => {
    if (e.charCode === 13){
      // e.preventDefault()
      listController.quickSearch(qSearchEntry)
    }
    // esc key
    if (e.charCode === 27) qSearchEntry = ''
  };

  async function fireButtonClick(btnItem, event) {
    // if it has an action then fire that
    try {
      isLoading = true
      // this.gridCtrl.toggleLoading(true)
      if (_.isFunction(btnItem.action)) {
        await btnItem.action(btnItem, event)
      } else {
        await listController.ctx.gridOptions.fireToolbarAction(btnItem, event)
      }
    } finally {
      isLoading = false
      // this.gridCtrl.toggleLoading(false)
    }
  }

// <slot name="title" />
</script>

<!-- FIXME works fine here but not when imported into rcm-ui -->
<!-- <style>
  /* .selection-pointer .material-icons {
    font-size: 16px;
    transform: rotate(90deg);
  } */

  .toolbar-item-left {
    margin-left: -10px;
  }
</style> -->

<header class="is-light is-dense has-border toolbar">
  <div class="toolbar-container">
    {#if $stateStore.hasSelected }
      <div class="toolbar-item toolbar-item-left px-0 py-0" in:fly>
        <div class="selection-pointer">
          <!-- subdirectory_arrow_right -->

          <i class="material-icons md-18 rotate-90">subdirectory_arrow_right</i>
        </div>
        {#each filterVisible(opts.selectedButtons) as btnItem}
          <TbButton opts={btnItem} on:click={() => fireButtonClick(btnItem)}/>
        {/each}
        <div class="divider-vertical"></div>
      </div>
    {/if}
    {#each filterVisible(opts.leftButtons) as btnItem}
      <TbButton opts={btnItem} on:click={() => fireButtonClick(btnItem)}/>
    {/each}

    <tb-button ng-repeat="(key, btnItem) in tbCtrl.opts.leftButtons" ng-if="!(btnItem.class=='hidden')" opts="btnItem"></tb-button>

    {#if title}
    <div class="toolbar-title">{title}</div>
    {/if}
    <div class="spacer"/>

    <QuickFilter />
    <slot name="filter" />

    <div class="toolbar-item p-0 quick-search-item">
      <div class="control has-icons-right has-icons-left">
        <input type="text" class="input is-rounded is-search quick-search"
          placeholder="Search"
          on:keypress={onSearchKeyPress}
          bind:value={qSearchEntry}>
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
        {#if qSearchEntry }
        <span class="icon is-small is-right">
          <a class="delete is-small" on:click={clearSearchInput}></a>
        </span>
        {/if}
      </div>
    </div>

    {#if options.searchFormButton.class !== 'hidden' }
    <Button tooltip="Toggle search form" icon="manage_search" on:click={toggleShowSearch}/>
    {/if}
    <Button popoverOpen=".list-options-popover" icon="more_vert" tooltip="Actions"/>
  </div>
</header>

<ListOptionsPopover {listController}/>


