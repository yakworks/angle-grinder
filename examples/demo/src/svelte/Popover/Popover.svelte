<script>
  import { Button, Avatar, Card, CardContent, Popover, List, ListItem, Toolbar,
    Icon, Link, Button7 } from '@ag-svelte/index'

  import growl from '@ag/tools/growl'

  let noref = "javascript:void(0)"

  let defaultMenuItems = [
    { id:'refresh', display: 'Refresh', material: 'refresh', action: () => growl.success('refresh')
    },
    { id:'reset_sort', display: 'Reset Sort', material: 'playlist_remove', action: () => growl.success('reset') },
    // { divider: true },
    { id:'column_config', display: 'Column Config', material: 'view_column', action: () => growl.success('config')},
    { id:'toggle_density', display: 'Density Toggle', material: 'expand', action: () => growl.success('toggle') },
    // { divider: true },
    { id:'toggle_show', display: 'Hide/Show Toggle', material: 'close_fullscreen' },
    { id:'expand', display: 'Expand', material: 'open_in_full' }
  ]

  let popMenuClick = (id) => (event) =>{
    console.log("popMenuClick", id, event)
    growl.success(`popMenuClick on id:${id}`)
  }


</script>
<!-- <App {...f7params}> -->
<Toolbar bottom>
  <Link popoverOpen=".popover-menu" >Open Popover</Link>
  <Button7 raised tooltip="open it" popoverOpen=".popover-menu2" iconMaterial="more_vert"/>
  <Button popoverOpen=".popover-menu2" icon="mdi-dots-vertical"/>
</Toolbar>

<Popover class="popover-menu">
  <List>
    <ListItem divider={false} link={noref} popoverClose title="Refresh" />
    <ListItem link={noref} popoverClose title="Reset Sort" />
    <ListItem link={noref} popoverClose title="Side Panels" />
    <ListItem divider={true} ></ListItem>
    <ListItem link="#" popoverClose title="List View" />
    <ListItem link="#" popoverClose title="Form Inputs" />
  </List>
</Popover>

<!-- </App> -->

<Popover class="popover-menu2">
  <List>
    {#each defaultMenuItems as item}
    <ListItem id={item.id} link="#" title={item.display} popoverClose on:click={popMenuClick(item.id)}>
      <span slot="media" class="material-icons-two-tone">
        {item.material}
      </span>
      <!-- <Icon slot="media" material={item.material}/> -->
    </ListItem>
    {/each}
  </List>
</Popover>

<Card>
  <CardContent class="p0">
    <List>
      {#each defaultMenuItems as item}
      <ListItem link={noref} title={item.display}>
        <Icon slot="media" material={item.material}/>
      </ListItem>
      {/each}
    </List>

  </CardContent>
</Card>
