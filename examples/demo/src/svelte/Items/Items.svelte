<script>
  // import { Avatar, Card, CardHeader, CardContent, Button, Columns, Col } from '@yakit/svelte'
  import {
    Avatar, Button, Columns, Col,
    Block, BlockTitle, Card, CardHeader, CardContent, CardFooter, Link, List, ListItem
  } from '@yakit/svelte'
  import { people } from '../../data/sample'

  let person = people[0]
  let imgSrc1 = `/assets/images/photos/${person.avatar}`

</script>

<style lang="scss">
  .card.block {

  }
</style>

<BlockTitle>Item Block Examples</BlockTitle>
<Block>
  <p>Item block are used in lists, card headers, card blocks, etc. </p>
</Block>

<Columns>
<Col>
  <Card class="px-4" outline noShadow>
    <div class="item-block">
      <div class="item-content">
        <div class="item-title item-label">Label</div>
        <div class="item-title"> Item Title</div>
        <div class="item-subtitle"> Secondary text </div>
      </div>
    </div>
  </Card>
</Col>
<Col>
  <Card class="px-4" outline noShadow>
    <div class="item-block">
      <Avatar class="item-avatar is-medium" imgSrc="{imgSrc1}"></Avatar>
      <div class="item-content">
        <div class="item-title item-label">{person.title}</div>
        <div class="item-title">{person.name}</div>
        <div class="item-subtitle">{person.email}</div>
      </div>
    </div>
  </Card>
</Col>
<Col>
  <Card class="px-4" elevation=0 outlined>
    <div class="item-block">
      <Avatar class="item-avatar" name={person.name}></Avatar>
      <div class="item-content">
        <div class="item-title">{person.name}</div>
        <div class="item-subtitle">{person.title}</div>
      </div>
    </div>
  </Card>
</Col>
</Columns>

<div class="title text-lg">Card Headers </div>
<Card>
  <CardHeader>
    <div class="item-block">
      <Avatar class="item-avatar" name={person.name}></Avatar>
      <div class="item-content">
        <div class="item-title font-bold text-lg">{person.name}</div>
        <div class="item-subtitle">{person.title}</div>
      </div>
    </div>
    <Button class="card-header-icon" icon="mdi mdi-pencil-outline"></Button>
  </CardHeader>
  <CardContent>GLorem ipsum</CardContent>
</Card>
