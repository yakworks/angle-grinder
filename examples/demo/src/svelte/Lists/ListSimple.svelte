<script>
  import {
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    Columns,
    Col } from 'angle-grinder/svelte'
</script>

<div class="title is-5">Simple Lists</div>

<Card>
  <List simpleList>
    <ListItem title="Item 1"></ListItem>
    <ListItem title="Item 2"></ListItem>
    <ListItem title="Item 3"></ListItem>
  </List>
</Card>
