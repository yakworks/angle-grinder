<script>
  import { Avatar, Columns, Col, BlockTitle, Card, CardContent, Icon, List, ListItem } from 'angle-grinder/svelte'
  import { SkeletonBlock } from 'skeleton-elements/svelte';
  let simpleList = ['Item 1', 'Item 2', 'Item 3']
  let dataList = [
    {name: 'DSO', val: 39},
    {name: 'ADP', tag: 42},
    {name: 'Open', val: '$1,234,345'},
    {name: 'Past Due', val: '$34,345'}
  ]

  let noref = "javascript:void(0)"

</script>

<Columns>
<Col>
<BlockTitle>Simple List</BlockTitle>
<Card>
  <CardContent class="p0">
    <List simpleList>
      {#each simpleList as item}
      <ListItem title={item}></ListItem>
      {/each}
    </List>
  </CardContent>
</Card>
</Col>

<Col>
<BlockTitle>Simple Links List</BlockTitle>
<Card>
  <CardContent class="p0">
    <List>
      {#each simpleList as item}
      <ListItem title={item} link={noref}></ListItem>
      {/each}
    </List>
  </CardContent>
</Card>
</Col>
</Columns>

<Columns>
<Col>
<BlockTitle>Data list</BlockTitle>
<Card>
  <CardContent class="p0">
    <List>
      {#each dataList as item}
      <ListItem title={item.name} after={item.val} badge={item.tag}></ListItem>
      {/each}
    </List>
  </CardContent>
</Card>
</Col>

<Col>
<BlockTitle>Contact List</BlockTitle>
<Card>
  <CardContent class="p0">
    <List mediaList v-if="loading">
      <ListItem class={`skeleton-text skeleton-effect-wave`} title="Full Name" subtitle="Position">
        <span slot="media">

          <SkeletonBlock style="width: 40px; height: 40px; border-radius: 50%" />
        </span>
      </ListItem>
    </List>
    <List>
      <ListItem link={noref} header="Name" title="John Doe">
        <Avatar slot="media" class="is-small" imgSrc="/assets/images/photos/beard-guy.jpg"></Avatar>
        <div class="item-after font-bold"> <span>CEO</span> </div>
      </ListItem>
      <ListItem link={noref} header="Phone" title="+7 90 111-22-3344" >
        <Icon slot="media" f7="phone"></Icon>
      </ListItem>
      <ListItem link={noref} header="Email" title="john@doe" footer="Home" >
        <Icon slot="media" f7="envelope"></Icon>
      </ListItem>
      <ListItem link={noref} header="Email" title="john@framework7" footer="Work" >
        <Icon slot="media" f7="envelope"></Icon>
      </ListItem>
    </List>
  </CardContent>
</Card>
</Col>
</Columns>
