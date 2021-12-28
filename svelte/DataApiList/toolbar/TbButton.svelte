<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import {Button} from '@ag-svelte/index'

  export let opts

  let isButton = true

  $: {
    if (opts.label && !opts.display) {
      opts.display = opts.label
    }
    if (opts.display && !opts.color) {
      opts.color = 'transparent'
    }

    // if it has menu items then its a dropdown not a button
    if (opts.menuItems) {
      isButton = false
    }
  }

</script>

{#if isButton }
  <Button tooltip={opts.tooltip} icon={opts.icon} on:click/>
{:else}
<!-- TODO setup popups -->
  <Button tooltip={opts.tooltip} icon={opts.icon} on:click/>
{/if}



