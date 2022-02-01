<script>
  import { Button, Avatar, Card, CardFooter, CardContent, Popover, List, ListItem, Toolbar,
    Icon, Link, Button7 } from '@yakit/svelte/index'
  import { ListForm, ListField, ListSelect, ListRangeFields } from '@yakit/svelte/Formify';
  import growl from '@yakit/ui/growl'

  const jq = window.$

  let noref = "javascript:void(0)"

  let defaultMenuItems = [
    { id:'refresh', display: 'Refresh', material: 'refresh', action: () => growl.success('refresh') },
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

  function init(node) {
    // testing that elements added by jquery can get the popover click event
    const div = jq(node)
    div.append('<a class="link popover-open" href="#" data-popover="#popover-edit">edit</a>')
  }

  function popoverOpenEvent(ev){
    console.log(ev)
    formContext.updateInitialValues({
      user:{ name: "jim", email:"bill"}
    })
  }

  function saveClick(ev){
    console.log(ev)
    editPopoverOpened = false
  }

  function cancelClick(){
    editPopoverOpened = false
  }

  let formContext = undefined
  let data = {}
  let editPopoverOpened = undefined

</script>
<!-- <App {...f7params}> -->
<Toolbar bottom>
  <Link popoverOpen=".popover-menu" >Open Popover</Link>
  <Button7 raised tooltip="open it" popoverOpen=".popover-menu2" iconMaterial="more_vert"/>
  <Button popoverOpen=".popover-menu2" icon="mdi-dots-vertical"/>
</Toolbar>

<div use:init>

</div>

<Popover class="popover-menu" backdrop={false}>
  <List>
    <ListItem divider={false} link={noref} popoverClose title="Refresh" />
    <ListItem link={noref} popoverClose title="Reset Sort" />
    <ListItem link={noref} popoverClose title="Side Panels" />
    <ListItem divider={true} ></ListItem>
    <ListItem link="#" popoverClose title="List View" />
    <ListItem link="#" popoverClose title="Form Inputs" />
  </List>
</Popover>

<Popover id="popover-edit" bind:opened={editPopoverOpened} onPopoverOpen={popoverOpenEvent}
  closeByOutsideClick={false} closeByBackdropClick={false} closeOnEscape={false}>
  <ListForm name="list-form" bind:data bind:context={formContext}>
    <ListField name="user.name" />
    <ListField name="user.email" />
    <CardFooter>
      <Link onClick={cancelClick}>Cancel</Link>
      <Link onClick={saveClick}>Save</Link>
    </CardFooter>
  </ListForm>
</Popover>

<!-- </App> -->

<Popover class="popover-menu2" backdrop={false}>
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

<!-- <Card>
  <CardContent class="p0">
    <List>
      {#each defaultMenuItems as item}
      <ListItem link={noref} title={item.display}>
        <Icon slot="media" material={item.material}/>
      </ListItem>
      {/each}
    </List>

  </CardContent>
</Card> -->
