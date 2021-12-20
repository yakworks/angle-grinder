<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import { onMount, onDestroy, tick } from 'svelte'
  import {Button, Button7} from '@ag-svelte/index'
  import { classNames } from '../../shared/utils'
  import ListOptionsPopover from './ListOptionsPopover.svelte'

  export let listController = undefined
  export let state = undefined
  //toolbar options
  export let options = undefined

  let isConfigured = false
  let qSearchEntry = ''

  let className = undefined;
  export { className as class };

  function clearSearchInput() {
    qSearchEntry = ''
    listController.quickSearch('')
  }

  const onSearchKeyPress = e => {
    if (e.charCode === 13){
      // e.preventDefault()
      listController.quickSearch(qSearchEntry)
    }
    // esc key
    if (e.charCode === 27) qSearchEntry = ''
  };

</script>

<header class="is-light is-dense has-border toolbar">
  <div class="toolbar-container">
    <Button icon="fa-bars"/>
    <div class="toolbar-title">List Title</div>
    <div class="spacer"/>

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
    <Button tooltip="Toggle search form" icon="manage_search" on:click={() => state.showSearchForm = !state.showSearchForm}/>
    {/if}
    <Button popoverOpen=".list-options-popover" icon="more_vert" tooltip="Actions"/>
  </div>
</header>

<ListOptionsPopover {listController} bind:state />



