<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { fade, fly } from "svelte/transition";
  import {Button, Button7, Segmented} from '@yakit/svelte/index'
  import TbButton from '../../Toolbar/TbButton.svelte'
  import { merge } from '@yakit/core/dash';
  import { classNames } from '../../shared/utils'
  import ListOptionsPopover from './ListOptionsPopover.svelte'

  //toolbar options
  export let title = undefined
  export let opts = {}
  export let listController
  export let listId = undefined

  /** the quickfilter buttons to add to toolbar */
  export let QuickFilter = undefined

  $: stateStore = listController.ctx.stateStore

  let isLoading = false
  let optionsPopoverId = `${listId}-options-popover`

  // let opts = options

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
        // calls the listController fireToolbarAction, which will fallback to the ctx.toolbarHandler
        await listController.fireToolbarAction(btnItem, event)
      }
    } finally {
      isLoading = false
      // this.gridCtrl.toggleLoading(false)
    }
  }

// <slot name="title" />
</script>

<!-- FIXME works fine here but not when imported into rcm-ui -->
<style>
  .toolbar {
    border-radius: 8px 8px 0 0;
    border: 1px solid var(--color-shade-10);
    border-bottom: none;
  }

</style>

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
      {#if btnItem.popoverId}
        <TbButton opts={btnItem} />
      {:else}
        <TbButton opts={btnItem} on:click={() => fireButtonClick(btnItem)}/>
      {/if}
    {/each}


    {#if title}
    <div class="spacer"/>
    <div class="toolbar-title text-gray-strong text-lg">{title}</div>
    {/if}
    <div class="spacer"/>

    <!-- <QuickFilter /> -->
    <svelte:component this={QuickFilter} />

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
          <a href={'#'} class="delete is-small" on:click={clearSearchInput}> </a>
        </span>
        {/if}
      </div>
    </div>

    {#if opts.searchFormButton.class !== 'hidden' }
    <Button tooltip="Toggle search form" icon="manage_search" on:click={toggleShowSearch}/>
    {/if}
    <Button popoverOpen={`#${optionsPopoverId}`} icon="more_vert" tooltip="Actions"/>
  </div>
</header>

<ListOptionsPopover popoverId={optionsPopoverId} {listController}/>


