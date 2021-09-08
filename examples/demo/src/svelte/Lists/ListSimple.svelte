<script>
  import { Avatar, Columns, Col } from 'angle-grinder/svelte'

  import { Page, Navbar, BlockTitle, Card, CardHeader, CardContent, CardFooter, Icon, Link, List, ListItem } from 'framework7-svelte';

  let noref = "javascript:void(0)"

</script>

<Columns>
<Col>
<BlockTitle>Simple List</BlockTitle>
<Card>
  <CardContent padding={false}>
    <List simpleList>
      <ListItem title="Item 1"></ListItem>
      <ListItem title="Item 2"></ListItem>
      <ListItem title="Item 3"></ListItem>
    </List>
  </CardContent>
</Card>
</Col>

<Col>
<BlockTitle>Simple Links List</BlockTitle>
<Card>
  <CardContent padding={false}>
    <List>
      <ListItem title="Link 1" link={noref}></ListItem>
      <ListItem title="Link 2" link={noref}></ListItem>
      <ListItem title="Link 3" link={noref}></ListItem>
    </List>
  </CardContent>
</Card>
</Col>
</Columns>

<Columns>
<Col>
<BlockTitle>Data list</BlockTitle>
<Card>
  <CardContent padding={false}>
    <List>
      <ListItem title="DSO" after="39"></ListItem>
      <ListItem title="ADP" badge="42"></ListItem>
      <ListItem title="Open" after="$1,234,345"></ListItem>
      <ListItem title="Past Due" after="$34,345"></ListItem>
    </List>
  </CardContent>
</Card>
</Col>

<Col>
<BlockTitle>Contact List</BlockTitle>
<Card>
  <CardContent padding={false}>
    <List>
      <ListItem link={noref} header="Name" title="John Doe" after="Edit">
        <Avatar slot="media" class="is-small" imgSrc="/assets/images/photos/beard-guy.jpg"></Avatar>
      </ListItem>
      <ListItem link={noref} header="Phone" title="+7 90 111-22-3344" after="Edit">
        <Icon slot="media" f7="phone"></Icon>
      </ListItem>
      <ListItem link={noref} header="Email" title="john@doe" footer="Home" after="Edit">
        <Icon slot="media" f7="envelope"></Icon>
      </ListItem>
      <ListItem link={noref} header="Email" title="john@framework7" footer="Work" after="Edit">
        <Icon slot="media" f7="envelope"></Icon>
      </ListItem>
    </List>
  </CardContent>
</Card>
</Col>
</Columns>
