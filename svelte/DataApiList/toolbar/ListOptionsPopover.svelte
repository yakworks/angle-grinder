<!--
  Wraps the jqGrid and adds the toolbar and search form
 -->
<script>
  import {Popover, List, ListItem} from '@ag-svelte/index'
  import growl from '@ag/tools/growl'
  import { isFunction } from '@ag/utils/dash';

  export let listController
  $: stateStore = listController.ctx.stateStore

  let defaultMenuItems = [
    { id:'refresh', display: 'Refresh', material: 'refresh'},
    { id:'reset_sort', display: 'Reset Sort', material: 'playlist_remove'},
    // { divider: true },
    { id:'column_config', display: 'Column Config', material: 'view_column'},
    { id:'toggle_density', display: 'Density Toggle', material: 'expand'},
    // { divider: true },
    // { id:'toggle_show', display: 'Hide/Show Toggle', material: 'close_fullscreen' },
    // { id:'expand', display: 'Expand', material: 'open_in_full' },
    // { id:'dummy', display: 'Not Enabled', class: 'hidden' }
  ]

  // filter out where class=hidden
  $: displayMenutItems = defaultMenuItems.filter(item => item.class !== 'hidden')

  let popMenuClick = (item) => (event) =>{
    switch (item.id) {
      case 'refresh':
        return listController.reloadKeepSelected()
      case 'reset_sort':
        return listController.resetSort()
      case 'column_config':
        return growl.info("Not Enabled")
      case 'toggle_density':
        $stateStore.isDense = !$stateStore.isDense
      default:
        if (isFunction(listController[item.id])) {
          return listController[item.id](item, event)
        }
    }
  }

  let popComponent;

  function popoverClose(data) {
    // console.log("popClose", popComponent.instance())
    // popComponent.__proto__.resize()
  }

</script>

<Popover bind:this={popComponent} class="list-options-popover" onPopoverClose={popoverClose}>
  <List>
    {#each displayMenutItems as item}
      <ListItem id={item.id} link="#" title={item.display} popoverClose
      noChevron={true} on:click={popMenuClick(item)}>
        <span slot="media" class="material-icons-two-tone">
          {item.material}
        </span>
        <!-- <Icon slot="media" material={item.material}/> -->
      </ListItem>
    {/each}
  </List>
</Popover>



